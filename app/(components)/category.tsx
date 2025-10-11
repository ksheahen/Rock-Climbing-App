import { Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "../styles/category";

function CategoryComponent() {
	// const [selectedLanguage, setSelectedLanguage] = useState();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Category</Text>
			<Text style={styles.dropdown}>Gym</Text>
			<View style={styles.icon_container}>
				<Icon name="arrow-drop-down-line"></Icon>
			</View>

			{/* For now we wont implement the picker */}
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

export default CategoryComponent;
