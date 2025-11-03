import { StyleSheet } from "react-native";
import { COLORS, PADDING } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    paddingTop: PADDING.top_page_padding,
    gap: PADDING.page_padding,
  },
  media: {
    width: "100%",
    height: 300,
    backgroundColor: COLORS.background3,
  },
});
