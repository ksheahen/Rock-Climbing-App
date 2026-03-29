export const HIGHEST_GRADE_ACHIEVEMENT_ID = "highest-grade";
export const ADVANCED_GRADE_ACHIEVEMENT_ID = "advanced-grade";
export const INTERMEDIATE_GRADE_ACHIEVEMENT_ID = "intermediate-grade";
export const BEGINNER_GRADE_ACHIEVEMENT_ID = "beginner-grade";
export const FLASH_MASTER_ACHIEVEMENT_ID = "flash-master";
export const STREAK_STARTER_ACHIEVEMENT_ID = "streak-starter";

export const DEFAULT_ACHIEVEMENTS = [
  {
    achievement_id: HIGHEST_GRADE_ACHIEVEMENT_ID,
    name: "Climber Level - Elite",
    description: "Reserved for climbers sending V13-V17 (inclusive).",
    badge_icon: "trophy",
  },
  {
    achievement_id: ADVANCED_GRADE_ACHIEVEMENT_ID,
    name: "Climber Level - Advanced",
    description: "Send V8-V12 climbs (inclusive).",
    badge_icon: "trophy",
  },
  {
    achievement_id: INTERMEDIATE_GRADE_ACHIEVEMENT_ID,
    name: "Climber Level - Intermediate",
    description: "Send V4-V7 climbs (inclusive).",
    badge_icon: "trophy",
  },
  {
    achievement_id: BEGINNER_GRADE_ACHIEVEMENT_ID,
    name: "Climber Level - Beginner",
    description: "Send V0-V3 climbs (inclusive).",
    badge_icon: "trophy",
  },
  {
    achievement_id: STREAK_STARTER_ACHIEVEMENT_ID,
    name: "Streak Starter",
    description: "Log climbs on 3 consecutive days.",
    badge_icon: "trophy",
  },
  {
    achievement_id: FLASH_MASTER_ACHIEVEMENT_ID,
    name: "Flash Master",
    description: "Complete 5 climbs on your first attempt.",
    badge_icon: "trophy",
  },
] as const;
