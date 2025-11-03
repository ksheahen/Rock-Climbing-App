import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "bold",
    color: COLORS.textGray,
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  sessionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
});

