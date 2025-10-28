import { StyleSheet } from "react-native";
import { GLOBAL } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: GLOBAL.component_spacing_small,
  },
});

export default styles;
