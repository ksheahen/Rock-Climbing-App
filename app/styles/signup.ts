import { StyleSheet } from "react-native";
import { COLORS } from "./global-styles";

// TODO: Styling looks a little weird on Android for the email and pwd inputs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
    backgroundColor: COLORS.background1,
  },
  // TODO: Probably should move email and pwd containers to their own style sheets
  emailContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 20,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  logo: {
    height: 150,
    width: 150,
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 10,
  },
});

export default styles;