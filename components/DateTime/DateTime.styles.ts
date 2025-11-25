import { COLORS, global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: global.font_size.phone_medium,
  },

  // single chip on the right
  pillCompact: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: global.border.border_radius,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: global.colors.background_2,
    maxWidth: 240,
  },
  pillCompactText: {
    fontSize: global.font_size.phone_medium ?? 12,
    maxWidth: 200,
  },

  // modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    width: "86%",
    maxHeight: "80%",
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: global.colors.background_1 ?? "#fff",
    borderColor: global.border.border_color,
    borderRadius: global.border.border_radius,
  },
  modalTitle: {
    fontSize: global.font_size.phone_medium,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: global.border.border_color,
  },

  timeRow: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  timeRowActive: {
    backgroundColor: global.colors.background_2,
  },
  timeRowText: {
    fontSize: global.font_size.phone_medium,
  },
  timeRowTextActive: {
    fontWeight: "600",
  },

  modalActions: {
    borderTopWidth: 1,
    borderTopColor: global.border.border_color,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  modalActionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  modalActionText: {
    fontSize: global.font_size.phone_medium,
  },
});

export default styles;
