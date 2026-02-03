import { StyleSheet } from "react-native";
import { COLORS, GLOBAL } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background1,
    display: "flex",
    width: "100%",
    paddingLeft: GLOBAL.page_leftright_margin,
    paddingRight: GLOBAL.page_leftright_margin,
    paddingTop: GLOBAL.page_top_margin,
    paddingBottom: GLOBAL.page_bottom_margin,
    gap: GLOBAL.component_spacing_medium,
  },
  leftright_container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  left: {},
  right: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  media: {
    marginTop: GLOBAL.component_spacing_large,
    borderRadius: GLOBAL.border_radius,
    width: "100%",
    height: 400, // placeholder until dynamic media
    backgroundColor: COLORS.background3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default styles;
