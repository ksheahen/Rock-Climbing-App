import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "./global-styles";

const TILE = 90;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: PADDING.page_padding,
    
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: FONT_SIZES.small,
  },
  mediaBox: {
    height: 182,
    width: 182,
    backgroundColor: COLORS.background3,
    borderRadius: BORDERRADIUS.default,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },  emptyText: {
    color: "#8E8E93",
    marginTop: 6,
  },
  scrollContent: {
    padding: 8,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: 12,
    marginRight: 8,
  },
  addTile: {
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  addTileText: {
    color: "#8E8E93",
    fontSize: 12,
    marginTop: 4,
  },
  thumbWrap: {
    position: "relative",
  },
  videoBg: {
    backgroundColor: "#000",
  },
  badge: {
    position: "absolute",
    left: 6,
    top: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
  },
  removeBtn: {
    position: "absolute",
    right: 6,
    top: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 999,
    padding: 4,
  },
});

export default styles;
