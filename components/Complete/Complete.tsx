import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Complete.styles";

interface CompleteComponentProps {
  selectedProp: string;
  onSelectedChange?: (category: string) => void;
}

function Complete({ selectedProp, onSelectedChange }: CompleteComponentProps) {
  const [selectedType, setSelectedType] = useState(selectedProp || "Yes");
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
        <Text style={styles.title}>Did you complete this problem?</Text>
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
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>
      )}
    </View>
  );
}

export default Complete;
