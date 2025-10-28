import { StyleSheet } from "react-native";
import { FONT_SIZES, PADDING } from "./global-styles";

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
  stars_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    padding: PADDING.dropdown_padding,
  },
  stars: {
    fontSize: FONT_SIZES.small,
  },
});

export default styles;
