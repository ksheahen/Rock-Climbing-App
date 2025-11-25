import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: global.margin.page_border,
    paddingVertical: global.margin.page_border / 2,
  },
  button: {
    backgroundColor: global.colors.background_2,
    paddingVertical: global.padding.small / 2,
    paddingHorizontal: global.padding.small,
    borderRadius: global.border.border_radius,
  },
  text: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
});
