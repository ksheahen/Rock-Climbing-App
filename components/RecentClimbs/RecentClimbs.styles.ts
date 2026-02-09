import { Dimensions, StyleSheet } from "react-native";
import { global } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: global.font_size.phone_medium,
    fontWeight: "bold",
    color: global.colors.text_2,
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  climbsScroll: {
    width: "100%",
  },
});
