export const colors = {
  primary: {
    blue: "#5A99E4",
    green: "#5CE26E",
    red: "#EF6065",
    yellow: "#FFCC02",
  },
  background: {
    primary: "#FFFFFE",
    secondary: "#F7F7FC",
    tertiary: "#E7E7EA",
    page: "#F2F2F7",
    card: "#FFF",
    analytics: "#F8F8F8",
  },
  text: {
    primary: "#000000",
    secondary: "#333333",
    gray: "#8E8E93",
    white: "#FFF",
  },
  border: "#F0F1F9",
  streak: {
    green: "#34C759",
    red: "#FF3B30",
  },
  star: {
    yellow: "#FFD700",
  },
  ui: {
    lightGray: "#E5E5EA",
  },
} as const;

// Legacy exports for backward compatibility during migration
export const COLORS = {
  background1: colors.background.primary,
  background2: colors.background.secondary,
  background3: colors.background.tertiary,
  border: colors.border,
  text1: colors.text.primary,
  text2: colors.text.secondary,
  textGray: colors.text.gray,
  white: colors.text.white,
  yellow: colors.primary.yellow,
  starYellow: colors.star.yellow,
  red: colors.primary.red,
  streakRed: colors.streak.red,
  blue: colors.primary.blue,
  green: colors.primary.green,
  streakGreen: colors.streak.green,
  lightGray: colors.ui.lightGray,
  pageBackground: colors.background.page,
  cardBackground: colors.background.card,
  analyticsBackground: colors.background.analytics,
};
