import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/category";

function CategoryComponent() {
  const [selectedCategory, setSelectedCategory] = useState("Indoor");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Category</Text>
        <Pressable
          style={styles.dropdown_container} // we use pressable instead of a view to use onPress param
          onPress={() => setIsPickerVisible(!isPickerVisible)}
        >
          <Text style={styles.dropdown}>{selectedCategory}</Text>
          <View style={styles.icon_container}>
            <Icon name="arrow-drop-down-line" size="24"></Icon>
          </View>
        </Pressable>
      </View>
      {/* conditionally render the picker */}
      {isPickerVisible && (
        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(e) => setSelectedCategory(e)}
            itemStyle={styles.picker}
          >
            <Picker.Item label="Indoor" value="Indoor" />
            <Picker.Item label="Outdoor" value="Outdoor" />
            <Picker.Item label="Board" value="Board" />
          </Picker>
        </View>
      )}
    </View>
  );
}

export default CategoryComponent;
