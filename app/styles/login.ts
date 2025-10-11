import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  emailContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 20
  },
  passwordContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 20
  },
  input: {
    flex: 1,
    paddingLeft: 10
  },
  logo: {
    height: 150,
    width: 150,
  }
});
