import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES } from "../../theme";

export const styles = StyleSheet.create({
  sessionCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDERRADIUS.medium,
    overflow: "hidden",
  },
  sessionImagePlaceholder: {
    height: 100,
    backgroundColor: COLORS.lightGray,
  },
  sessionInfo: {
    padding: 12,
  },
  sessionGrade: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    color: COLORS.text1,
    fontFamily: "Roboto",
  },
  sessionTries: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textGray,
    marginTop: 4,
    fontFamily: "Roboto",
  },
  sessionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  sessionDate: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textGray,
    fontFamily: "Roboto",
  },
});

