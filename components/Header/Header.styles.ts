import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: global.margin.page_border * 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: global.margin.page_border,
    paddingVertical: 10,
    backgroundColor: global.colors.background_1,
  },
  button: {
    backgroundColor: "#E5E5EA",
    borderRadius: global.border.border_radius,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 15,
  },
});
