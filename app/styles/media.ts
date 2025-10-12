import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: PADDING.page_padding,
    paddingRight: PADDING.page_padding,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZES.small,
  },
  mediaBox: {
    height: 182,
    width: 182,
    backgroundColor: COLORS.background3,
    borderRadius: BORDERRADIUS.default,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
