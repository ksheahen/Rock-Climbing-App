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
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: global.font_size.phone_large,
    fontWeight: "300",
  },
});

export default styles;
