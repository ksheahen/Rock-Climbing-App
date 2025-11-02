import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES, GLOBAL } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    width: "100%",
    paddingLeft: GLOBAL.page_leftright_margin,
    paddingRight: GLOBAL.page_leftright_margin,
    paddingBottom: GLOBAL.page_bottom_margin,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: COLORS.background1,
    display: "flex",
    gap: GLOBAL.component_spacing_medium,
  },
});

export default styles;
