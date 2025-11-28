import { StyleSheet } from "react-native";
import { BORDERRADIUS, PADDING, global } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: PADDING.page_padding,
    paddingVertical: PADDING.page_padding / 2,
  },
  button: {
    backgroundColor: global.colors.background_2,
    paddingVertical: global.padding.small / 2,
    paddingHorizontal: global.padding.small,
    borderRadius: BORDERRADIUS.default,
  },
  text: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
});