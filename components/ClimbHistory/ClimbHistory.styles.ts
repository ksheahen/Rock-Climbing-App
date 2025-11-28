import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: global.padding.large,
  },
  mini_container: {
    marginBottom: global.gap.medium,
  },
  date: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_2,
    marginBottom: global.gap.medium,
  },
  time: {
    fontSize: global.font_size.phone_medium,
    marginTop: global.gap.medium,
    marginBottom: global.padding.small,
  },
  gradeRow: {
    display: "flex",
    flexDirection: "row",
    gap: global.padding.small,
  },
  grade: {},
  stars: {
    display: "flex",
    flexDirection: "row",
    width: 100,
  },
  tries: {
    marginTop: global.padding.small,
    paddingLeft: 22,
  },
});

export default styles;
