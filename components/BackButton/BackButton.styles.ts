import { global } from "@/theme";
import { StyleSheet } from "react-native";

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
