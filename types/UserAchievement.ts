export interface UserAchievement {
  user_id: string; // FK to user
  achievement_id: string; // FK to achievement
  earned_date: string; // ISO date string
}

// Insert requires user_id and achievement_id; earned_date defaults to now
export type UserAchievementInsert = Omit<UserAchievement, "earned_date">;

// Update: allow partial update (currently maybe just earned_date)
export type UserAchievementUpdate = Partial<
  Omit<UserAchievement, "user_id" | "achievement_id">
>;