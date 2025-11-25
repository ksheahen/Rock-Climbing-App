import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  section: {
    marginTop: global.padding.large * 2,
  },
  sectionTitle: {
    fontSize: global.font_size.phone_medium,
    fontWeight: 600,
    color: global.colors.text_1,
    marginBottom: global.padding.large,
  },
  analyticsContainer: {
    flexDirection: "row",
    gap: global.gap.large,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: global.colors.background_1,
    alignItems: "center",
    maxHeight: 200,
  },
  chartPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
  },
  circularPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: global.colors.background_2,
    marginBottom: 20,
  },
  smallChartPlaceholder: {
    width: "100%",
    height: "50%",
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
  },
});
