import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		marginTop: 60,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: global.colors.background_1,
	},
	button: {
		backgroundColor: global.colors.background_2,
		borderRadius: global.border.border_radius,
		paddingHorizontal: 12,
		paddingVertical: 5,
	},
	buttonText: {
		color: global.colors.text_1,
		fontSize: global.font_size.phone_medium,
	},
});
