import { StyleSheet } from "react-native";
import { COLORS, PADDING } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: PADDING.page_padding,
    backgroundColor: COLORS.background2,
  },
  iconButton: {
    padding: 10,
  },
});

export default styles;
