import { COLORS, FONT_SIZES, global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pointsSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 12,
  },
  pointsTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: "bold",
    color: global.colors.text_1,
    fontFamily: "Roboto",
  },
  pointsSubtitle: {
    fontSize: FONT_SIZES.regular,
    color: COLORS.textGray,
    marginTop: 4,
    fontFamily: "Roboto",
  },
});
