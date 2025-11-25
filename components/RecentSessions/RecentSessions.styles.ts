import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	section: {
		marginTop: global.padding.large * 2,
	},
	sectionTitle: {
		fontSize: global.font_size.phone_medium,
		fontWeight: "bold",
		color: global.colors.text_2,
		marginBottom: global.padding.large,
	},
	sessionsScroll: {
		marginHorizontal: -20,
		paddingHorizontal: 20,
	},
});
