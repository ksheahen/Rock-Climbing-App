import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES } from "../../theme";

export const styles = StyleSheet.create({
  daySelector: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: BORDERRADIUS.large,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  dayRed: {
    backgroundColor: COLORS.streakRed,
  },
  dayGreen: {
    backgroundColor: COLORS.streakGreen,
  },
  daySelected: {
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.text1,
  },
  dayText: {
    fontSize: FONT_SIZES.small,
    fontWeight: "600",
    color: COLORS.white,
    fontFamily: "Roboto",
  },
  dayTextSelected: {
    color: COLORS.text1,
  },
  dateText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.white,
    marginTop: -2,
    fontFamily: "Roboto",
  },
  dateTextSelected: {
    color: COLORS.text1,
  },
});
