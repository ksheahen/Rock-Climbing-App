import { COLORS, FONT_SIZES, PADDING, global } from "@/theme";
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
    color: COLORS.text1,
  },
  inputGroup: {
    marginBottom: global.margin.page_border,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    marginBottom: 4,
    color: COLORS.text2,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: global.border.border_radius,
    padding: PADDING.dropdown_padding,
    backgroundColor: COLORS.background3,
    color: COLORS.text1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: global.margin.page_border,
  },
  button: {
    flex: 1,
    padding: PADDING.dropdown_padding,
    borderRadius: global.border.border_radius,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.blue,
  },
  saveButton: {
    backgroundColor: COLORS.blue,
  },
  buttonText: {
    color: COLORS.text1,
    fontWeight: "bold",
  },
});

export default styles;
