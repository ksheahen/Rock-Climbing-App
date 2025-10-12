import { StyleSheet } from "react-native";
import { COLORS, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderStyle: "solid",
    borderWidth: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: PADDING.page_padding,
    paddingRight: PADDING.page_padding,
  },
  media: {
    // width: "100%",
    // height: 200,
    backgroundColor: COLORS.background3,
  },
});

export default styles;