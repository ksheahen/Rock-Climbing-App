import { StyleSheet } from "react-native";
import { COLORS, GLOBAL, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills the screen
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background1,
    paddingLeft: PADDING.page_padding,
    paddingRight: PADDING.page_padding,
    display: "flex",
    flexDirection: "column",
    paddingTop: PADDING.page_padding * 4,
  },
  mainContent: {
    flex: 1, // allows the main content area to expand
    display: "flex",
    flexDirection: "column",
    gap: GLOBAL.component_spacing_medium,
  },
});

export default styles;
