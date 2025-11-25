import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  analyticsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: global.colors.background_3,
    borderRadius: global.border.border_radius,
    marginHorizontal: 20,
    marginVertical: global.padding.medium,
  },
  sectionTitle: {
    fontSize: global.font_size.phone_medium,
    fontWeight: "bold",
    color: global.colors.text_2,
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  analyticsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  analyticsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: global.colors.background_1,
    borderRadius: global.border.border_radius,
    padding: 16,
    alignItems: "center",
  },
  chartPlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
  },
  circularPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: global.colors.background_2,
    marginBottom: 12,
  },
  smallChartPlaceholder: {
    width: "100%",
    height: 40,
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
  },
});
