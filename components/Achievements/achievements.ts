
export const HIGHEST_GRADE_ACHIEVEMENT_ID = "highest-grade";

export const DEFAULT_ACHIEVEMENTS = [
  {
    achievement_id: HIGHEST_GRADE_ACHIEVEMENT_ID,
    name: "Highest Grade Climbed",
    description: "Send your hardest grade to unlock this achievement.",
    badge_icon: "trophy",
  },
  {
    achievement_id: "x-point-day",
    name: "X Point Day",
    description: "Earn 100 points in a single climbing session.",
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
  {
    achievement_id: "session-crusher",
    name: "Session Crusher",
    description: "Finish 20 total climbs in one day.",
    badge_icon: "trophy",
  },
] as const;