import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: global.padding.large,
    alignItems: "flex-start",
    paddingTop: global.margin.page_top,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: global.colors.background_2,
  },
  settingsButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: global.colors.background_3,
    borderRadius: global.border.border_radius_large,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: global.colors.text_1,
    fontSize: global.font_size.phone_medium,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    padding: global.padding.large,
    paddingBottom: global.padding.large * 3,
    gap: global.gap.medium,
    backgroundColor: global.colors.background_1,
    borderTopLeftRadius: global.border.border_radius_large,
    borderTopRightRadius: global.border.border_radius_large,
  },
  modalButton: {
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
    paddingVertical: global.padding.medium,
    paddingHorizontal: global.padding.medium,
  },
  modalButtonText: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
  modalSyncRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: global.gap.small,
  },
});
