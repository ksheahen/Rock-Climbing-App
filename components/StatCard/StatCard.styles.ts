import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  wrapper: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
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
    color: "#222",
  },
  labelText: {
    marginTop: 4,
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
  },
});

export default styles;
