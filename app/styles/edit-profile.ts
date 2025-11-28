import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background1,
    padding: PADDING.page_padding,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.background2,
    borderRadius: BORDERRADIUS.default,
    padding: PADDING.page_padding * 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: FONT_SIZES.large,
    fontWeight: "bold",
    marginBottom: PADDING.page_padding,
    color: COLORS.text1,
  },
  inputGroup: {
    marginBottom: PADDING.page_padding,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    marginBottom: 4,
    color: COLORS.text2,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDERRADIUS.default,
    padding: PADDING.dropdown_padding,
    backgroundColor: COLORS.background3,
    color: COLORS.text1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: PADDING.page_padding,
  },
  button: {
    flex: 1,
    padding: PADDING.dropdown_padding,
    borderRadius: BORDERRADIUS.default,
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
