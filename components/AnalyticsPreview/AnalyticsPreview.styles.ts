import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, MARGIN } from "../../theme";

export const styles = StyleSheet.create({
  analyticsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.analyticsBackground,
    borderRadius: BORDERRADIUS.medium,
    marginHorizontal: 20,
    marginVertical: MARGIN.element_margin,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "bold",
    color: COLORS.textGray,
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
    backgroundColor: COLORS.cardBackground,
    borderRadius: BORDERRADIUS.medium,
    padding: 16,
    alignItems: "center",
  },
  chartPlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDERRADIUS.small,
  },
  circularPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightGray,
    marginBottom: 12,
  },
  smallChartPlaceholder: {
    width: "100%",
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDERRADIUS.small,
  },
});
