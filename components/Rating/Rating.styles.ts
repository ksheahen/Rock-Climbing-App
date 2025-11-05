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
  stars_container: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center", //makes container only as tall as content
    alignSelf: "flex-start",
    padding: global.padding.small,
  },
  stars: {
    fontSize: global.font_size.phone_medium,
  },
});

export default styles;
