import { StyleSheet } from "react-native";
import { FONT_SIZES, PADDING } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: PADDING.page_padding,
    paddingRight: PADDING.page_padding,
  },
  title: {
    fontSize: FONT_SIZES.small,
    paddingTop: 5, //offset for the dropdown
  },
  description_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    padding: PADDING.dropdown_padding,
  },
  description: {
    fontSize: FONT_SIZES.small,
  },
});
