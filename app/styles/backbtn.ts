import { StyleSheet } from "react-native";
import { FONT_SIZES, MARGIN } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginBottom: MARGIN.element_margin,
  },
  button_text: {
    fontSize: FONT_SIZES.small,
    display: "flex",
    alignSelf: "center",
  },
});

export default styles;
