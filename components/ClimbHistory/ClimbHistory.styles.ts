import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: PADDING.page_padding / 2,
  },
  date: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text2,
    marginBottom: PADDING.page_padding / 2,
  },
  climbItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.background3,
    borderRadius: BORDERRADIUS.default,
    padding: PADDING.dropdown_padding,
    marginBottom: PADDING.page_padding / 2,
  },
  info: {
    flexDirection: "column",
  },
  time: {
    fontSize: FONT_SIZES.small,
    marginBottom: 2,
  },
  gradeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  grade: {
    fontSize: FONT_SIZES.small,
    marginLeft: 5,
  },
  stars: {
    fontSize: FONT_SIZES.small,
    marginLeft: 5,
    color: COLORS.text1,
  },
  sub: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text2,
  },
  videoButton: {
    backgroundColor: COLORS.background2,
    padding: 5,
    borderRadius: BORDERRADIUS.default,
    alignItems: "center",
    justifyContent: "center",
  },
  videoText: {
    fontSize: FONT_SIZES.small,
    textAlign: "center",
  },
});
