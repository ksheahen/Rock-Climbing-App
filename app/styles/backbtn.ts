import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, GLOBAL } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: GLOBAL.component_spacing_small,
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text1,
  },
});

export default styles;
