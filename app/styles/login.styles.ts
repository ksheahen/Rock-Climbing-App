import { global } from "@/theme";
import { StyleSheet } from "react-native";
// TODO: Styling looks a little weird on Android for the email and pwd inputs
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
    backgroundColor: global.colors.background_1,
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
  // TODO: Adjust Padding/Spacing to accomdate addition of back button
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: global.colors.background_1,
  },
});

export default styles;
