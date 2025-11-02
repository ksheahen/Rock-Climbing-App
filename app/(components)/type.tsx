import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/type";

interface TypeComponentProps {
  selectedCategoryProp: string;
  onSelectedCategoryChange?: (category: string) => void;
}

function TypeComponent({
  selectedCategoryProp,
  onSelectedCategoryChange,
}: TypeComponentProps) {
  const [selectedType, setSelectedType] = useState(
    selectedCategoryProp || "Boulder"
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // notify parent whenever the state changes
  useEffect(() => {
    if (onSelectedCategoryChange) {
      onSelectedCategoryChange(selectedType);
    }
  }, [selectedType, onSelectedCategoryChange]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Type</Text>
        <Pressable
          style={styles.dropdown_container}
          onPress={() => setIsPickerVisible(!isPickerVisible)}
        >
          <Text style={styles.dropdown}>{selectedType}</Text>
          <View style={styles.icon_container}>
            <Icon name="arrow-drop-down-line" size="24"></Icon>
          </View>
        </Pressable>
      </View>

      {/* conditionally render the picker */}
      {isPickerVisible && (
        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedType}
            onValueChange={(e) => setSelectedType(e)}
            itemStyle={styles.picker}
          >
            <Picker.Item label="Boulder" value="Boulder" />
            <Picker.Item label="Route" value="Route" />
          </Picker>
        </View>
      )}
    </View>
  );
}

export default TypeComponent;

