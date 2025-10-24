import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: PADDING.page_padding / 2,
  },
  button: {
    backgroundColor: COLORS.background3,
    paddingVertical: PADDING.dropdown_padding / 2,
    paddingHorizontal: PADDING.dropdown_padding,
    borderRadius: BORDERRADIUS.default,
  },
  text: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text1,
  },
});

export default styles;
