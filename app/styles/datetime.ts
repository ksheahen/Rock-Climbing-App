import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, PADDING, BORDERRADIUS } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: FONT_SIZES.small,
  },

  // single chip on the right
  pillCompact: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDERRADIUS.default,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: COLORS.background3,
    maxWidth: 240,
  },
  pillCompactText: {
    fontSize: FONT_SIZES.small ?? 12,
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
    backgroundColor: COLORS.background2 ?? "#fff",
    borderRadius: BORDERRADIUS.default,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: FONT_SIZES.small,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  timeRow: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  timeRowActive: {
    backgroundColor: COLORS.background3,
  },
  timeRowText: {
    fontSize: FONT_SIZES.small,
  },
  timeRowTextActive: {
    fontWeight: "600",
  },

  modalActions: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "flex-end",
  },
  modalActionBtn: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  modalActionText: {
    fontSize: FONT_SIZES.small,
  },
});

export default styles;
