import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZES } from "./global-styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
    backgroundColor: COLORS.background1,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: "300",
  },
});

export default styles;