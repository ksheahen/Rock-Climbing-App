import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Attempt.styles";

interface AttemptComponentProps {
  selectedProp: string;
  onSelectedChange?: (category: string) => void;
}

function Attempt({ selectedProp, onSelectedChange }: AttemptComponentProps) {
  const [selectedAttempt, setSelectedAttempt] = useState(selectedProp || "1");
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Sync internal state with prop whenever the prop changes
  useEffect(() => {
    setSelectedAttempt(selectedProp);
  }, [selectedProp]);

  // notify parent whenever the state changes
  useEffect(() => {
    if (onSelectedChange) {
      onSelectedChange(selectedAttempt);
    }
  }, [selectedAttempt, onSelectedChange]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Attempt</Text>
        <Pressable
          style={styles.dropdown_container}
          onPress={() => setIsPickerVisible(!isPickerVisible)}
        >
          <Text style={styles.dropdown}>{selectedAttempt}</Text>
          <View style={styles.icon_container}>
            <Icon name="arrow-drop-down-line" size="24"></Icon>
          </View>
        </Pressable>
      </View>

      {/* conditionally render the picker */}
      {isPickerVisible && (
        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedAttempt}
            onValueChange={(e) => setSelectedAttempt(e)}
            itemStyle={styles.picker}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="10+" value="10+" />
          </Picker>
        </View>
      )}
    </View>
  );
}

export default Attempt;
