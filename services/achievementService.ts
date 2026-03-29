import {
    ADVANCED_GRADE_ACHIEVEMENT_ID,
    BEGINNER_GRADE_ACHIEVEMENT_ID,
    FLASH_MASTER_ACHIEVEMENT_ID,
    HIGHEST_GRADE_ACHIEVEMENT_ID,
    INTERMEDIATE_GRADE_ACHIEVEMENT_ID,
    STREAK_STARTER_ACHIEVEMENT_ID,
} from "@/components/Achievements/achievements";
import uuid from "react-native-uuid";

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
  const complete = String(climb.complete ?? "")
    .trim()
    .toLowerCase();
  return climb.deleted === 0 && (complete === "yes" || complete === "true");
}

function isFlashClimb(climb: ClimbRow) {
  const attempt = String(climb.attempt ?? "").trim();
  return isCompletedClimb(climb) && attempt === "1";
}

function normalizeGrade(grade: string) {
  return grade.replace(/\s+/g, "");
}

function getVGradeValue(grade: string): number | null {
  const normalized = normalizeGrade(grade);
  const match = normalized.match(/V(\d+)/i);
  if (!match) return null;

  const value = Number.parseInt(match[1], 10);
  return Number.isNaN(value) ? null : value;
}

function hasVGradeInRange(climbs: ClimbRow[], minV: number, maxV: number) {
  return climbs.some((climb) => {
    if (!isCompletedClimb(climb) || !climb.grade) return false;

    const vGrade = getVGradeValue(climb.grade);
    return vGrade !== null && vGrade >= minV && vGrade <= maxV;
  });
}

function hasEliteGradeClimb(climbs: ClimbRow[]) {
  return hasVGradeInRange(climbs, 13, 17);
}

function hasAdvancedGradeClimb(climbs: ClimbRow[]) {
  return hasVGradeInRange(climbs, 8, 12);
}

function hasIntermediateGradeClimb(climbs: ClimbRow[]) {
  return hasVGradeInRange(climbs, 4, 7);
}

function hasBeginnerGradeClimb(climbs: ClimbRow[]) {
  return hasVGradeInRange(climbs, 0, 3);
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
  const earnedAt = new Date().toISOString();

  // Re-activate if it already exists but is soft-deleted.
  const updateResult = await db.runAsync(
    `UPDATE user_achievement
     SET deleted = 0,
         synced = 0,
         earned_at = ?
     WHERE user_id = ?
       AND achievement_id = ?`,
    [earnedAt, userId, achievementId],
  );

  if ((updateResult?.changes ?? 0) > 0) return;

  const userAchievementId = uuid.v4().toString();
  await db.runAsync(
    `INSERT OR IGNORE INTO user_achievement
     (user_achievement_id, user_id, achievement_id, earned_at, synced, deleted)
     VALUES (?, ?, ?, ?, 0, 0)`,
    [userAchievementId, userId, achievementId, earnedAt],
  );
}

async function unawardAchievement(
  db: any,
  userId: string,
  achievementId: string,
) {
  await db.runAsync(
    `UPDATE user_achievement
     SET deleted = 1,
         synced = 0
     WHERE user_id = ?
       AND achievement_id = ?
       AND deleted = 0`,
    [userId, achievementId],
  );
}

async function syncAchievementState(
  db: any,
  userId: string,
  achievementId: string,
  shouldBeEarned: boolean,
) {
  if (shouldBeEarned) {
    await awardAchievement(db, userId, achievementId);
    return;
  }

  await unawardAchievement(db, userId, achievementId);
}

export async function syncAchievementsForUser(db: any, userId: string) {
  const climbs = await getAllActiveClimbs(db);

  await syncAchievementState(
    db,
    userId,
    HIGHEST_GRADE_ACHIEVEMENT_ID,
    hasEliteGradeClimb(climbs),
  );

  await syncAchievementState(
    db,
    userId,
    ADVANCED_GRADE_ACHIEVEMENT_ID,
    hasAdvancedGradeClimb(climbs),
  );

  await syncAchievementState(
    db,
    userId,
    INTERMEDIATE_GRADE_ACHIEVEMENT_ID,
    hasIntermediateGradeClimb(climbs),
  );

  await syncAchievementState(
    db,
    userId,
    BEGINNER_GRADE_ACHIEVEMENT_ID,
    hasBeginnerGradeClimb(climbs),
  );

  await syncAchievementState(
    db,
    userId,
    FLASH_MASTER_ACHIEVEMENT_ID,
    hasFiveFlashClimbs(climbs),
  );

  await syncAchievementState(
    db,
    userId,
    STREAK_STARTER_ACHIEVEMENT_ID,
    hasThreeDayStreak(climbs),
  );
}

export async function evaluateHighestGradeAchievement(db: any, userId: string) {
  const alreadyEarned = await hasEarnedAchievement(
    db,
    userId,
    HIGHEST_GRADE_ACHIEVEMENT_ID,
  );

  if (alreadyEarned) return false;

  const climbs = await getAllActiveClimbs(db);

  if (!hasEliteGradeClimb(climbs)) return false;

  await awardAchievement(db, userId, HIGHEST_GRADE_ACHIEVEMENT_ID);
  return true;
}

export async function evaluateFlashMasterAchievement(db: any, userId: string) {
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
