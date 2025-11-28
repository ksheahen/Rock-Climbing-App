// Full Achievement object (matches DB)
export interface Achievement {
  achievement_id: string;
  name: string;
  description?: string;
  badge_icon?: string;
}

// Type for inserting a new achievement
export type AchievementInsert = Omit<Achievement, "achievement_id">;

// Type for updating an achievement
export interface AchievementUpdate {
  name?: string;
  description?: string;
  badge_icon?: string;
}