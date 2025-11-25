import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	pointsSection: {
		gap: global.gap.small,
		alignItems: "center",
		paddingVertical: global.padding.medium,
	},
	pointsTitle: {
		fontSize: 24,
		fontWeight: 600,
		color: global.colors.text_1,
	},
	pointsSubtitle: {
		fontSize: global.font_size.phone_medium,
		color: global.colors.text_2,
	},
});
