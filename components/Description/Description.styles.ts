import { StyleSheet } from "react-native";
import { global } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    fontSize: global.font_size.phone_medium,
    paddingTop: global.padding.medium, //offset for the dropdown
  },
  description_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    padding: global.padding.small,
  },
  description: {
    fontSize: global.font_size.phone_medium,
  },
});