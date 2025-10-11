import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONT_SIZES, PADDING } from "./global-styles";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		padding: PADDING.page_padding,
	},
	title: {
		fontSize: FONT_SIZES.small,
    paddingTop: 2.5, //offset for the dropdown
	},
	dropdown_container: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "auto",
		backgroundColor: COLORS.background3,
    borderRadius: BORDERRADIUS.default,
		alignItems: "center", //makes container only as tall as content
		alignSelf: "flex-start",
		padding: PADDING.dropdown_padding,
	},
	dropdown: {
		fontSize: FONT_SIZES.small,
	},
	icon_container: {},
});
