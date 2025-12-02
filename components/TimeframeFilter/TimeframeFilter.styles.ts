import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 10,
    paddingTop: 12,
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

// import { global } from "@/theme";
// import { StyleSheet } from "react-native";

// export const styles = StyleSheet.create({
//   container: {
//     marginTop: global.padding.large,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     backgroundColor: global.colors.background_3,
//     paddingVertical: global.padding.small,
//     paddingHorizontal: global.padding.medium,
//     alignItems: "center",
//     borderRadius: global.border.border_radius_large,
//   },
//   selected_button: {
//     // TODO:  only have background and shadow when selected
//     backgroundColor: "white",
//     paddingVertical: global.padding.small,
//     paddingHorizontal: global.padding.medium,
//     borderRadius: global.border.border_radius,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   selected_text: {
//     fontSize: global.font_size.phone_medium,
//     color: global.colors.text_1,
//     // TODO:  only bold when selected
//     fontWeight: 600,
//   },
//   button: {},
//   text: {},
// });
