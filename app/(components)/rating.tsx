import { Text, View } from "react-native";
import { styles } from "../styles/attempt";

function RatingComponent() {
	// const [selectedLanguage, setSelectedLanguage] = useState();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Rating</Text>
			<View style={styles.dropdown_container}>
				<Text style={styles.dropdown}>Placeholder</Text>
			</View>

			{/* TODO: implement the picker */}
			{/* <Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
			>
				<Picker.Item label="Gym" value="Gym" />
				<Picker.Item label="Board" value="Board" />
				<Picker.Item label="Outdoors" value="Outdoors" />
			</Picker> */}
		</View>
	);
}

export default RatingComponent;
