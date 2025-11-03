import { StyleSheet } from "react-native";
import { COLORS } from "../../theme";

// TODO: Styling looks a little weird on Android for the email and pwd inputs
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
    backgroundColor: COLORS.background1,
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
