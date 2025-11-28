import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  sessionCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: global.colors.background_3,
    borderRadius: 10,
    overflow: "hidden",
  },
  sessionImagePlaceholder: {
    height: 100,
    backgroundColor: global.colors.background_2,
  },
  sessionInfo: {
    padding: 12,
  },
  sessionGrade: {
    fontSize: global.font_size.phone_large,
    fontWeight: "bold",
    color: global.colors.text_1,
    fontFamily: "Roboto",
  },
  sessionTries: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_2,
    marginTop: 4,
    fontFamily: "Roboto",
  },
  sessionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  sessionDate: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_2,
    fontFamily: "Roboto",
  },
});
