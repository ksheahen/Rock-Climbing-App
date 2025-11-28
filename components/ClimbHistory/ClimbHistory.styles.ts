import { StyleSheet } from "react-native";
import { COLORS, GLOBAL, global } from "../../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: GLOBAL.component_spacing_large,
  },
  mini_container: {
    marginBottom: GLOBAL.component_spacing_medium,
  },
  date: {
    fontSize: global.font_size.phone_medium,
    color: COLORS.text2,
    marginBottom: GLOBAL.component_spacing_medium,
  },
  time: {
    fontSize: global.font_size.phone_medium,
    marginTop: GLOBAL.component_spacing_medium,
    marginBottom: GLOBAL.component_spacing_small,
  },
  gradeRow: {
    display: "flex",
    flexDirection: "row",
    gap: GLOBAL.component_spacing_small,
  },
  grade: {},
  stars: {},
  tries: {
    marginTop: GLOBAL.component_spacing_small,
    paddingLeft: 22,
  },
});

export default styles;