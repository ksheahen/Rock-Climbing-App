import { StyleSheet } from "react-native";
import { BORDERRADIUS, global } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  line: {
    borderColor: global.colors.background_2,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: BORDERRADIUS.default,
  },
});

export default styles;
