import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, global } from "../../theme";

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
    borderColor: global.colors.text_1,
  },
  dayText: {
    fontSize: global.font_size.phone_medium,
    fontWeight: "600",
    color: COLORS.white,
    fontFamily: "Roboto",
  },
  dayTextSelected: {
    color: global.colors.text_1,
  },
  dateText: {
    fontSize: FONT_SIZES.tiny,
    color: COLORS.white,
    marginTop: -2,
    fontFamily: "Roboto",
  },
  dateTextSelected: {
    color: global.colors.text_1,
  },
});
