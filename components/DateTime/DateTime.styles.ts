import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, global } from "../../theme";

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
    borderRadius: BORDERRADIUS.default,
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
    backgroundColor: COLORS.background2 ?? "#fff",
    borderRadius: BORDERRADIUS.default,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  modalTitle: {
    fontSize: global.font_size.phone_medium,
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
    fontSize: global.font_size.phone_medium,
  },
});

export default styles;
