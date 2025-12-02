import { StyleSheet } from "react-native";
import { global } from "@/theme";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  card: {
    backgroundColor: global.colors.background_1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  valueText: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
    color: global.colors.text_1,
  },
  labelText: {
    marginTop: 4,
    fontSize: 12,
    color: global.colors.text_2,
    textAlign: "center",
  },
  iconContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    position: "absolute",
  },
});

export default styles;
