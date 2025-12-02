import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8E8E93",
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  chartSection: {
    marginBottom: 32,
    // shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // elevation (Android)
    elevation: 4,
  },
});

export default styles;
