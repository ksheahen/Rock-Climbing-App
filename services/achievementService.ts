import uuid from "react-native-uuid";
import {
  FLASH_MASTER_ACHIEVEMENT_ID,
  HIGHEST_GRADE_ACHIEVEMENT_ID,
  STREAK_STARTER_ACHIEVEMENT_ID,
} from "@/components/Achievements/achievements";

type ClimbRow = {
  id: number;
  type: string | null;
  grade: string | null;
  complete: string | null;
  attempt: string | null;
  datetime: string | null;
  deleted: number;
};

function isCompletedClimb(climb: ClimbRow) {
  const complete = String(climb.complete ?? "").trim().toLowerCase();
  return climb.deleted === 0 && (complete === "yes" || complete === "true");
}

function isFlashClimb(climb: ClimbRow) {
  const attempt = String(climb.attempt ?? "").trim();
  return isCompletedClimb(climb) && attempt === "1";
}

function normalizeGrade(grade: string) {
  return grade.replace(/\s+/g, "");
}

function hasHighestGradeClimb(climbs: ClimbRow[]) {
  return climbs.some((climb) => {
    if (!isCompletedClimb(climb) || !climb.grade) return false;

    const type = String(climb.type ?? "").trim().toLowerCase();
    const grade = normalizeGrade(climb.grade);

    const isMaxBoulder = type === "boulder" && grade === "9a/V17";
    const isMaxRoute = type === "route" && grade === "8c/5.13d";

    return isMaxBoulder || isMaxRoute;
  });
}

function hasFiveFlashClimbs(climbs: ClimbRow[]) {
  return climbs.filter(isFlashClimb).length >= 5;
}

function toLocalDateString(datetime: string) {
  const date = new Date(datetime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hasThreeDayStreak(climbs: ClimbRow[]) {
  const uniqueDays = Array.from(
    new Set(
      climbs
        .filter((climb) => climb.deleted === 0 && !!climb.datetime)
        .map((climb) => toLocalDateString(climb.datetime as string)),
    ),
  ).sort();

  if (uniqueDays.length < 3) return false;

  const dayMs = 24 * 60 * 60 * 1000;
  let streak = 1;

  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]).getTime();
    const curr = new Date(uniqueDays[i]).getTime();
    const diffDays = Math.round((curr - prev) / dayMs);

    if (diffDays === 1) {
      streak += 1;
      if (streak >= 3) return true;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  return false;
}

async function getAllActiveClimbs(db: any): Promise<ClimbRow[]> {
  const rows = await db.getAllAsync(
    `SELECT id, type, grade, complete, attempt, datetime, deleted
     FROM log_climb5
     WHERE deleted = 0`,
    [],
  );

  return Array.isArray(rows) ? (rows as ClimbRow[]) : [];
}

async function hasEarnedAchievement(
  db: any,
  userId: string,
  achievementId: string,
) {
  const rows = await db.getAllAsync(
    `SELECT user_achievement_id
     FROM user_achievement
     WHERE user_id = ?
       AND achievement_id = ?
       AND deleted = 0
     LIMIT 1`,
    [userId, achievementId],
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function awardAchievement(
  db: any,
  userId: string,
  achievementId: string,
) {
  const userAchievementId = uuid.v4().toString();

  await db.runAsync(
    `INSERT OR IGNORE INTO user_achievement
     (user_achievement_id, user_id, achievement_id, earned_at, synced, deleted)
     VALUES (?, ?, ?, ?, 0, 0)`,
    [
      userAchievementId,
      userId,
      achievementId,
      new Date().toISOString(),
    ],
  );
}

export async function evaluateHighestGradeAchievement(
  db: any,
  userId: string,
) {
  const alreadyEarned = await hasEarnedAchievement(
    db,
    userId,
    HIGHEST_GRADE_ACHIEVEMENT_ID,
  );

  if (alreadyEarned) return false;

  const climbs = await getAllActiveClimbs(db);

  if (!hasHighestGradeClimb(climbs)) return false;

  await awardAchievement(db, userId, HIGHEST_GRADE_ACHIEVEMENT_ID);
  return true;
}

export async function evaluateFlashMasterAchievement(
  db: any,
  userId: string,
) {
  const alreadyEarned = await hasEarnedAchievement(
    db,
    userId,
    FLASH_MASTER_ACHIEVEMENT_ID,
  );

  if (alreadyEarned) return false;

  const climbs = await getAllActiveClimbs(db);

  if (!hasFiveFlashClimbs(climbs)) return false;

  await awardAchievement(db, userId, FLASH_MASTER_ACHIEVEMENT_ID);
  return true;
}

export async function evaluateStreakStarterAchievement(
  db: any,
  userId: string,
) {
  const alreadyEarned = await hasEarnedAchievement(
    db,
    userId,
    STREAK_STARTER_ACHIEVEMENT_ID,
  );

  if (alreadyEarned) return false;

  const climbs = await getAllActiveClimbs(db);

  if (!hasThreeDayStreak(climbs)) return false;

  await awardAchievement(db, userId, STREAK_STARTER_ACHIEVEMENT_ID);
  return true;
}