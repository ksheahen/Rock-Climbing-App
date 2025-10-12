import { StyleSheet } from "react-native";
import { COLORS, PADDING, BORDERRADIUS } from "./global-styles";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: 10,
    backgroundColor: COLORS.background1, // white background
  },
  button: {
    backgroundColor: "#E5E5EA",
    borderRadius: BORDERRADIUS.default,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 15,
  },
});
