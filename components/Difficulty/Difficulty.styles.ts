import { StyleSheet } from "react-native";
import { global } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: global.font_size.phone_medium,
    paddingTop: global.padding.medium, //offset for the dropdown
  },
  picker_container: {
    width: "100%",
  },
  picker: {
    color: global.colors.text_1,
    fontSize: global.font_size.phone_medium,
  },
  dropdown_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    backgroundColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
    padding: global.padding.small,
  },
  dropdown: {
    fontSize: global.font_size.phone_medium,
  },
  icon_container: {},
});

export default styles;
