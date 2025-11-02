import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, PADDING,FONT_SIZES} from "./global-styles";

const styles = StyleSheet.create({
  container: {
    marginTop: PADDING.page_padding * 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: 10,
    backgroundColor: COLORS.background1, // white background
  },
  button: {
    backgroundColor: "#E5E5EA",
    borderRadius: BORDERRADIUS.default,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  buttonText: {
    color: "#000",
    fontSize: 15,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "600",
  },
});

export default styles;
