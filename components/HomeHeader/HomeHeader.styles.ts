import { global } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: global.margin.page_top,
	},
	logo: {
		fontSize: global.font_size.phone_medium,
		color: global.colors.text_1,
		fontWeight: 600,
	},
	headerRight: {
		flexDirection: "row",
		gap: global.gap.large,
	},
	flameBadge: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	flameText: {
		fontSize: global.font_size.phone_medium,
		fontWeight: 600,
		color: global.colors.red,
	},
	filterContainer: {},
	filterButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
		backgroundColor: global.colors.background_3,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: global.border.border_radius_large,
		width: 65,
	},
	filterText: {
		fontSize: global.font_size.phone_medium,
		color: global.colors.text_2,
	},
});
