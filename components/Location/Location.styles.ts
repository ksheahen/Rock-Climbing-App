import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
	},
	title: {
		fontSize: global.font_size.phone_medium,
		paddingTop: global.padding.medium, //offset for the dropdown
	},
	picker_container: {
		width: "100%",
	},
	picker: {
		color: global.colors.text_1,
		fontSize: global.font_size.phone_medium,
	},
	dropdown_container: {
		display: "flex",
		flexDirection: "row",
		marginLeft: "auto",
		alignItems: "center", //makes container only as tall as content
		alignSelf: "flex-start",
		backgroundColor: global.colors.background_2,
		borderRadius: global.border.border_radius,
		padding: global.padding.small,
	},
	dropdown: { fontSize: global.font_size.phone_medium },
	icon_container: {},

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

export default styles;
