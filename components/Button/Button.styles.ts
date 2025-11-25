import { COLORS, global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    padding: 12,
    borderRadius: global.border.border_radius,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: global.colors.text_1,
    fontSize: global.font_size.phone_medium,
    fontWeight: "bold",
  },
});
