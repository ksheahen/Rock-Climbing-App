import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // fills the screen
    width: "100%",
    height: "100%",
    backgroundColor: global.colors.background_1,
    paddingLeft: global.margin.page_border,
    paddingRight: global.margin.page_border,
    display: "flex",
    flexDirection: "column",
    paddingTop: global.margin.page_top,
  },
  mainContent: {
    flex: 1, // allows the main content area to expand
    display: "flex",
    flexDirection: "column",
    gap: global.gap.medium,
  },
});

export default styles;
