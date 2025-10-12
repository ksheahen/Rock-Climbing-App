import { Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "../styles/difficulty";

function DifficultyComponent() {
  // const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grade</Text>
      <View style={styles.dropdown_container}>
        <Text style={styles.dropdown}>V10</Text>
        <View style={styles.icon_container}>
          <Icon name="arrow-drop-down-line" size="24"></Icon>
        </View>
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

export default DifficultyComponent;
