import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: PADDING.page_padding / 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: PADDING.page_padding / 2,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.background3,
  },
  editButton: {
    backgroundColor: COLORS.background3,
    paddingVertical: PADDING.dropdown_padding / 2,
    paddingHorizontal: PADDING.dropdown_padding,
    borderRadius: BORDERRADIUS.default,
  },
  editButtonText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.text1,
  },
  name: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "bold",
    marginBottom: 5,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  handle: {
    fontSize: FONT_SIZES.small,
    marginLeft: 5,
    color: COLORS.text2,
  },
});

