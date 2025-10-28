import { StyleSheet } from "react-native";
import { COLORS, GLOBAL } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background1,
    display: "flex",
    width: "100%",
    height: "100%",
    paddingLeft: GLOBAL.page_leftright_margin,
    paddingRight: GLOBAL.page_leftright_margin,
    paddingTop: GLOBAL.page_top_margin,
    gap: GLOBAL.component_spacing_medium,
  },
  media: {
    borderRadius: GLOBAL.border_radius,
    width: "100%",
    height: 280, // placeholder until dynamic media
    backgroundColor: COLORS.background3,
  },
});

export default styles;
