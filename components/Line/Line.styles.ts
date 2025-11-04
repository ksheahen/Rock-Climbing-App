import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS } from "../../theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  line: {
    borderColor: COLORS.background3,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: BORDERRADIUS.default,
  },
});

export default styles;
