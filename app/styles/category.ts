import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, GLOBAL, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: FONT_SIZES.small,
    paddingTop: 5, //offset for the dropdown
  },
  dropdown_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    backgroundColor: COLORS.background3,
    borderRadius: GLOBAL.border_radius,
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    padding: PADDING.dropdown_padding,
  },
  dropdown: {
    fontSize: FONT_SIZES.small,
  },
  icon_container: {},
});

export default styles;
