import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Roboto",
    marginRight: 30,
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default styles;
