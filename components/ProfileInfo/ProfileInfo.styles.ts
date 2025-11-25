import { COLORS, FONT_SIZES, global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: global.margin.page_border,
    paddingVertical: global.margin.page_border / 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: global.margin.page_border / 2,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: global.colors.background_2,
  },
  editButton: {
    backgroundColor: global.colors.background_2,
    paddingVertical: global.padding.small / 2,
    paddingHorizontal: global.padding.small,
    borderRadius: global.border.border_radius,
  },
  editButtonText: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
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
    fontSize: global.font_size.phone_medium,
    marginLeft: 5,
    color: COLORS.text2,
  },
});
