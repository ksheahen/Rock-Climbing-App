import { StyleSheet } from "react-native";
import { global } from "../../theme";

const styles = StyleSheet.create({
	container: {
		display: "flex",
		width: "100%",
		backgroundColor: global.colors.background_1,
		paddingLeft: global.margin.page_border,
		paddingRight: global.margin.page_border,
		paddingTop: global.margin.page_top,
		paddingBottom: global.margin.page_top,
	},
	scroll_container: {
		display: "flex",
		gap: global.gap.medium,
	},
	leftright_container: {
		display: "flex",
		flexDirection: "row",
		width: "100%",
		paddingBottom: global.padding.medium,
	},
	left: {},
	right: {
		display: "flex",
		justifyContent: "flex-end",
		marginLeft: "auto",
	},
	media: {
		borderRadius: global.border.border_radius,
		width: "100%",
		height: 400, // placeholder until dynamic media
		backgroundColor: global.colors.background_2,
	},
	modal_outter_container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "flex-end",
	},
	modal_inner_container: {
		display: "flex",
		width: "100%",
		height: "20%",
		backgroundColor: global.colors.background_1,
		// for some reason borderRadius doesnt work here
	},
});

export default styles;
