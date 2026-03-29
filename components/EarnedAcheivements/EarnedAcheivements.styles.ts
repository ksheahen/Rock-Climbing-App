import { global } from "@/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // marginTop: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    // paddingTop: 8,
    paddingBottom: 4,
  },
  emptyText: {
    color: "#8E8E93",
    marginTop: 8,
  },
  card: {
    backgroundColor: global.colors.background_2,
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    minWidth: 150,
  },
  cardTitle: {
    marginTop: 8,
    color: global.colors.text_1,
    fontWeight: "600",
  },
  cardDesc: {
    marginTop: 4,
    color: global.colors.text_2,
    fontSize: 12,
  },
  badgeImage: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
});
