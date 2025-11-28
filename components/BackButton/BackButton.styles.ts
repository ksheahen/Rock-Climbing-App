import { StyleSheet } from "react-native";
import { global } from "../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: global.gap.small,
  },
  text_container: {
    display: "flex",
    justifyContent: "center",
  },
  text: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
});

export default styles;
