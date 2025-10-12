import { View } from "react-native";
import { styles } from "../styles/line";

function LineComponent() {
	return (
		<View style={styles.container}>
			<View style={styles.line}></View>
		</View>
	);
}

export default LineComponent;
