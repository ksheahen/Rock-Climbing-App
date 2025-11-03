import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "../../theme";

export const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.blue,
    padding: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.text1,
    fontSize: FONT_SIZES.small,
    fontWeight: "bold",
  },
});
