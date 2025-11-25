import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  pointsSection: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 12,
  },
  pointsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: global.colors.text_1,
    fontFamily: "Roboto",
  },
  pointsSubtitle: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_2,
    marginTop: 4,
    fontFamily: "Roboto",
  },
});
