export const HIGHEST_GRADE_ACHIEVEMENT_ID = "highest-grade";

export const DEFAULT_ACHIEVEMENTS = [
  {
    achievement_id: HIGHEST_GRADE_ACHIEVEMENT_ID,
    name: "Highest Grade Climbed",
    description: "Send your hardest grade to unlock this achievement.",
    badge_icon: "trophy",
  },
  {
    achievement_id: "streak-starter",
    name: "Streak Starter",
    description: "Log climbs on 3 consecutive days.",
    badge_icon: "trophy",
  },
  {
    achievement_id: "flash-master",
    name: "Flash Master",
    description: "Complete 5 climbs on your first attempt.",
    badge_icon: "trophy",
  },
] as const;
