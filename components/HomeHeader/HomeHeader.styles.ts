import { BORDERRADIUS, COLORS, FONT_SIZES, global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: FONT_SIZES.regular,
    fontWeight: "600",
    color: global.colors.text_1,
    fontFamily: "Roboto",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  filterContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  flameBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDERRADIUS.medium,
    gap: 4,
    width: 60,
    marginTop: 2,
  },
  flameText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
    color: COLORS.streakRed,
    fontFamily: "Roboto",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDERRADIUS.small,
    width: 60,
  },
  filterText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textGray,
    fontFamily: "Roboto",
  },
});
