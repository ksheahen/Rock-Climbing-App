import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: global.colors.background_1,
    paddingTop: global.margin.page_top,
    paddingBottom: 10,
  },
  button: {
    backgroundColor: global.colors.background_3,
    borderRadius: global.border.border_radius_large,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: {
    color: global.colors.text_1,
    fontSize: global.font_size.phone_medium,
  },
});
