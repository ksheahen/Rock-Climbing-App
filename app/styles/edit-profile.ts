import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.colors.background_1,
    padding: global.padding.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: global.colors.background_1,
    borderRadius: global.border.border_radius,
    padding: global.margin.page_border * 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: global.font_size.phone_large,
    fontWeight: "bold",
    marginBottom: global.margin.page_border,
    color: global.colors.text_1,
  },
  inputGroup: {
    marginBottom: global.margin.page_border,
  },
  label: {
    fontSize: global.font_size.phone_medium,
    marginBottom: 4,
    color: global.colors.text_2,
  },
  input: {
    borderWidth: 1,
    borderColor: global.border.border_color,
    borderRadius: global.border.border_radius,
    padding: global.padding.small,
    backgroundColor: global.colors.background_3,
    color: global.colors.text_1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: global.margin.page_border,
  },
  button: {
    flex: 1,
    padding: global.padding.small,
    borderRadius: global.border.border_radius,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: global.colors.blue,
  },
  saveButton: {
    backgroundColor: global.colors.blue,
  },
  buttonText: {
    color: global.colors.text_1,
    fontWeight: "bold",
  },
});

export default styles;
