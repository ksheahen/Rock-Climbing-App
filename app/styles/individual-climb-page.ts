import { StyleSheet } from "react-native";
import { COLORS, MARGIN, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background1,
    width: "100%",
    height: "100%",
    paddingTop: PADDING.top_page_padding,
    paddingLeft: PADDING.page_padding,
    paddingRight: PADDING.page_padding,
  },
  header_container: {
    display: "flex",
    flexDirection: "row",
  },
  media: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.background3,
    marginBottom: MARGIN.element_margin,
  },
});

export default styles;
