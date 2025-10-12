import { Text, View } from "react-native";
import { styles } from "../styles/rating";

function RatingComponent() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Rating</Text>
			<View style={styles.stars_container}>
				<Text style={styles.stars}>Placeholder</Text>
			</View>
		</View>
	);
}

export default RatingComponent;
