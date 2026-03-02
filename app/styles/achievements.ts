import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background_1,
  },
  header: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: global.margin.page_border,
    paddingTop: global.margin.page_top,
    paddingBottom: global.padding.large,
  },
  content: {
    paddingHorizontal: global.margin.page_border,
    paddingBottom: global.padding.large,
  },
  backbtnContainer: {
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    paddingTop: global.padding.medium,
    paddingBottom: global.padding.medium,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: global.colors.text_1,
  },
  awardRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: global.colors.background_3,
    borderColor: global.border.border_color,
    borderWidth: 1,
    borderRadius: 12,
    padding: global.padding.medium,
    marginBottom: global.gap.medium,
    gap: global.gap.medium,
  },
  awardImage: {
    width: 56,
    height: 56,
    borderRadius: global.border.border_radius_large,
  },
  awardTextContainer: {
    flex: 1,
  },
  awardName: {
    color: global.colors.text_1,
    fontSize: global.font_size.phone_medium,
    fontWeight: "600",
    marginBottom: global.gap.small,
  },
  awardDescription: {
    color: global.colors.text_2,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default styles;
