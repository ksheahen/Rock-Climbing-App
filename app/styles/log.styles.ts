import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: global.colors.background_1,
    paddingLeft: global.margin.page_border,
    paddingRight: global.margin.page_border,
    paddingBottom: global.margin.page_top,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: global.colors.background_1,
    display: "flex",
    gap: global.gap.medium,
    // borderColor: "red",
    // borderStyle: "solid",
    // borderWidth: 10,
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: global.padding.medium,
    paddingBottom: global.padding.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: global.colors.text_1,
  },
});

export default styles;
