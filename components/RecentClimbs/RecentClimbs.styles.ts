import { Dimensions, StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
  climbsScroll: {
    width: "100%",
  },
});
