import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: global.padding.large,
    alignItems: "flex-start",
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: global.colors.background_2,
  },
  editButton: {
    paddingVertical: global.padding.medium,
    backgroundColor: global.colors.background_3,
    paddingHorizontal: global.padding.medium,
    borderRadius: global.border.border_radius,
  },
  editButtonText: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
  name: {
    fontSize: global.font_size.phone_medium,
    fontWeight: 600,
    marginBottom: global.padding.small,
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: global.padding.medium,
  },
  handle: {
    fontSize: global.font_size.phone_medium,
    marginLeft: 5,
    color: global.colors.text_2,
  },
});
