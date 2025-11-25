import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  daySelector: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    gap: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: global.colors.background_4,
    alignItems: "center",
    justifyContent: "center",
  },
  dayRed: {
    backgroundColor: global.colors.red,
  },
  dayGreen: {
    backgroundColor: global.colors.green,
  },
  daySelected: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: global.colors.text_1,
  },
  dayText: {
    fontSize: global.font_size.phone_medium,
    fontWeight: "600",
    color: "white",
    fontFamily: "Roboto",
  },
  dayTextSelected: {
    color: global.colors.text_1,
  },
  dateText: {
    fontSize: global.font_size.tiny,
    color: "white",
    marginTop: -2,
    fontFamily: "Roboto",
  },
  dateTextSelected: {
    color: global.colors.text_1,
  },
});
