import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  title: {
    fontSize: global.font_size.phone_medium,
    paddingTop: global.padding.medium,
  },
  preview_container: {
    marginLeft: "auto",
    width: "65%",
    minHeight: 60,
    borderWidth: 2,
    borderColor: global.colors.background_2,
    borderRadius: global.border.border_radius,
    paddingHorizontal: global.padding.medium,
    paddingVertical: global.padding.small,
    justifyContent: "center",
    backgroundColor: "white",
  },
  preview_text: {
    fontSize: global.font_size.phone_medium,
  },
  preview_placeholder: {
    opacity: 0.5,
  },

  // Modal
  modal_backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },
  modal_card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  modal_title: {
    fontSize: global.font_size.phone_large,
    marginBottom: 20,
  },
  modal_input: {
    fontSize: global.font_size.phone_medium,
    minHeight: 330,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 12,
    padding: 10,
  },
  counter: {
    alignSelf: "flex-end",
    marginTop: 6,
    opacity: 0.5,
  },
  modal_actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  btn_secondary: {
    padding: 10,
    marginRight: 10,
  },
  btn_primary: {
    padding: 10,
    backgroundColor: "#111",
    borderRadius: 8,
  },
});
