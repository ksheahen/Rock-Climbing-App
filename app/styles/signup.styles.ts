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
