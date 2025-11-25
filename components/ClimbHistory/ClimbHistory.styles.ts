import { COLORS, GLOBAL, global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: GLOBAL.component_spacing_large,
  },
  mini_container: {
    marginBottom: global.gap.medium,
  },
  date: {
    fontSize: global.font_size.phone_medium,
    color: COLORS.text2,
    marginBottom: global.gap.medium,
  },
  time: {
    fontSize: global.font_size.phone_medium,
    marginTop: global.gap.medium,
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
