import { Dimensions, StyleSheet } from "react-native";
import { global } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const styles = StyleSheet.create({
	cardContainer: {
		width: SCREEN_WIDTH - 40,
		marginBottom: 16,
		backgroundColor: global.colors.background_2,
		borderRadius: global.border.border_radius,
		overflow: "hidden",
	},
	media: {
		width: "100%",
		height: 180,
		backgroundColor: global.colors.background_2,
	},
	mediaItem: {
		width: "100%",
		height: "100%",
	},
	info: {
		padding: 12,
	},
	grade: {
		fontSize: global.font_size.phone_large,
		fontWeight: "bold",
		color: global.colors.text_1,
	},
});
