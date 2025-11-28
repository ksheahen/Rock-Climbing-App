import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Type.styles";

// type checking
interface TypeComponentProps {
  selectedProp: string;
  onSelectedChange?: (category: string) => void;
  editToggle: boolean;
}

function Type({
  selectedProp, // sets the initial category
  onSelectedChange, // callback function
  editToggle,
}: TypeComponentProps) {
  const [selectedType, setSelectedType] = useState(selectedProp || "Boulder");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Sync internal state with prop whenever the prop changes
  useEffect(() => {
    setSelectedType(selectedProp);
  }, [selectedProp]);

  // notify parent whenever the state changes
  useEffect(() => {
    if (onSelectedChange) {
      onSelectedChange(selectedType);
    }
  }, [selectedType, onSelectedChange]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Type</Text>

        {/* when editToggle = true, show everthing */}
        {/* when editToggle = false, show just view mode */}
        {editToggle ? (
          <Pressable
            style={styles.dropdown_container}
            onPress={() => setIsPickerVisible(!isPickerVisible)}
          >
            <Text style={styles.dropdown}>{selectedType}</Text>
            <View style={styles.icon_container}>
              <Icon name="arrow-drop-down-line" size="24"></Icon>
            </View>
          </Pressable>
        ) : (
          <View style={styles.dropdown_container}>
            <Text style={styles.dropdown}>{selectedType}</Text>
          </View>
        )}
      </View>

      {/* conditionally render the picker */}
      {editToggle && isPickerVisible && (
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

export default Type;
