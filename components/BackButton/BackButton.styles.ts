import { StyleSheet } from "react-native";
import { GLOBAL, global } from "../../theme";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: GLOBAL.component_spacing_small,
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
