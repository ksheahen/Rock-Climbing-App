import { StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, PADDING } from "./global-styles";

export const styles = StyleSheet.create({
    container: {
		width: "100%",
		padding: PADDING.page_padding,
	},
    line: {
        borderColor: COLORS.text1,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: BORDERRADIUS.default,
    },
});
