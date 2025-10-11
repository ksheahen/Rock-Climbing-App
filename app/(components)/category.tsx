import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Text, View } from "react-native";

function CategoryComponent() {
	const [selectedLanguage, setSelectedLanguage] = useState();

	return (
		<View className="category-component-container">
			<Text className="title">Category</Text>
			<Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
			>
				<Picker.Item label="Gym" value="Gym" />
				<Picker.Item label="Board" value="Board" />
				<Picker.Item label="Outdoors" value="Outdoors" />
			</Picker>
		</View>
	);
}

export default CategoryComponent;
