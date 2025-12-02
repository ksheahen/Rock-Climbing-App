import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
  },
  dateButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    alignItems: "center",
  },
  dateButtonActive: {
    backgroundColor: "#4A90E2",
  },
  dateButtonText: {
    color: "#1C1C1E",
    fontSize: 13,
    fontWeight: "600",
  },
  dateButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default styles;
