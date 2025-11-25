import { global } from "@/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: global.colors.background_1,
		paddingLeft: global.margin.page_border,
		paddingRight: global.margin.page_border,
	},
	mainContent: {
		marginTop: global.margin.page_top,
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
});

export default styles;
