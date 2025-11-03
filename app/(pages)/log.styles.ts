import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, PADDING } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: PADDING.page_padding / 2,
    paddingBottom: 100,
    gap: PADDING.page_padding,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: PADDING.page_padding / 2,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
  },
});
