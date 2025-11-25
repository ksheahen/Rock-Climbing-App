import { global } from "@/theme";
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
    fontSize: global.font_size.phone_medium,
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
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: global.border.border_radius,
    gap: 4,
    width: 60,
    marginTop: 2,
  },
  flameText: {
    fontSize: global.font_size.phone_medium,
    fontWeight: "600",
    color: global.colors.red,
    fontFamily: "Roboto",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: global.colors.background_4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: global.border.border_radius,
    width: 65,
  },
  filterText: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_2,
    fontFamily: "Roboto",
  },
});
