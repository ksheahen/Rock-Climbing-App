import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  line: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
  },
});

export default styles;
