import uuid from "react-native-uuid";
import { HIGHEST_GRADE_ACHIEVEMENT_ID } from "@/components/Achievements/achievements";

type ClimbRow = {
  id: number;
  type: string | null;
  grade: string | null;
  complete: string | null;
  deleted: number;
};

function isCompletedClimb(climb: ClimbRow) {
  const complete = String(climb.complete ?? "")
    .trim()
    .toLowerCase();

  return climb.deleted === 0 && (complete === "yes" || complete === "true");
}

function normalizeGrade(grade: string) {
  return grade.replace(/\s+/g, "");
}

function hasHighestGradeClimb(climbs: ClimbRow[]) {
  return climbs.some((climb) => {
    if (!isCompletedClimb(climb) || !climb.grade) return false;

    const type = String(climb.type ?? "")
      .trim()
      .toLowerCase();

    const grade = normalizeGrade(climb.grade);

    const isMaxBoulder = type === "boulder" && grade === "9a/V17";
    const isMaxRoute = type === "route" && grade === "8c/5.13d";

    return isMaxBoulder || isMaxRoute;
  });
}

async function getAllActiveClimbs(db: any): Promise<ClimbRow[]> {
  const rows = await db.getAllAsync(
    `SELECT id, type, grade, complete, deleted
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