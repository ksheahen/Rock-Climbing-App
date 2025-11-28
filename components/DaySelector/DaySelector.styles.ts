import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  daySelector: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: global.padding.large,
  },
  dayCircle: {
    borderColor: global.colors.background_2,
    borderStyle: "dashed",
    borderWidth: 2,

    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  dayRed: {
    borderColor: global.colors.red,
    borderStyle: "solid",
    borderWidth: 2,
  },
  dayGreen: {
    borderColor: global.colors.green,
    borderStyle: "solid",
    borderWidth: 2,
  },
  daySelected: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: global.colors.text_1,
    borderStyle: "solid",
  },
  dayText: {
    fontSize: global.font_size.phone_medium,
    color: global.colors.text_1,
  },
  dayTextSelected: {
    color: global.colors.text_1,
  },
  dateText: {
    fontSize: global.font_size.tiny,
    color: global.colors.text_1,
    marginTop: -2,
  },
  dateTextSelected: {
    color: global.colors.text_1,
  },
});
