import { Picker } from "@react-native-picker/picker";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Difficulty.styles";

interface GradeComponentProps {
  selectedProp: string;
  onSelectedChange?: (value: string) => void;
  editToggle: boolean;
  climbType: "Boulder" | "Route";
}

function Difficulty({
  selectedProp,
  onSelectedChange,
  editToggle,
  climbType,
}: GradeComponentProps) {
 
  const BOULDER_GRADES = [
    "4a/V0",
    "4b/V0",
    "4c/V0",
    "5a/V1",
    "5b/V1",
    "5c/V2",
    "6a/V3",
    "6a+/V3",
    "6b/V4",
    "6b+/V4",
    "6c/V5",
    "6c+/V5",
    "7a/V6",
    "7a+/V7",
    "7b/V8",
    "7b+/V8",
    "7c/V9",
    "7c+/V10",
    "8a/V11",
    "8a+/V12",
    "8b/V13",
    "8b+/V14",
    "8c/V15",
    "8c+/V16",
    "9a/V17",
  ];

  
  const ROUTE_GRADES = [
    "5c/5.8",
    "6a/5.9",
    "6a+/5.10a",
    "6b/5.10b",
    "6b+/5.10c",
    "6c/5.10d",
    "6c+/5.11a",
    "7a/5.11b",
    "7a+/5.11c",
    "7b/5.11d",
    "7b+/5.12a",
    "7c/5.12b",
    "7c+/5.12c",
    "8a/5.12d",
    "8a+/5.13a",
    "8b/5.13b",
    "8b+/5.13c",
    "8c/5.13d",
  ];

  const gradeOptions = useMemo(() => {
    return climbType === "Boulder" ? BOULDER_GRADES : ROUTE_GRADES;
  }, [climbType]);

  const defaultGrade = gradeOptions[0];

  const [selectedDifficulty, setSelectedDifficulty] = useState(
    selectedProp || defaultGrade,
  );
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Sync internal state with prop whenever prop changes
  useEffect(() => {
    setSelectedDifficulty(selectedProp);
  }, [selectedProp]);

  // When climbType changes, ensure the grade is valid for that type
  useEffect(() => {
    if (!gradeOptions.includes(selectedDifficulty)) {
      setSelectedDifficulty(defaultGrade);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [climbType, gradeOptions]);

  // Notify parent whenever internal state changes
  useEffect(() => {
    onSelectedChange?.(selectedDifficulty);
  }, [selectedDifficulty, onSelectedChange]);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Grade</Text>

        {editToggle ? (
          <Pressable
            style={styles.dropdown_container}
            onPress={() => setIsPickerVisible(!isPickerVisible)}
          >
            <Text style={styles.dropdown}>{selectedDifficulty}</Text>
            <View style={styles.icon_container}>
              <Icon name="arrow-drop-down-line" size="24" />
            </View>
          </Pressable>
        ) : (
          <View style={styles.dropdown_container}>
            <Text style={styles.dropdown}>{selectedDifficulty}</Text>
          </View>
        )}
      </View>

      {editToggle && isPickerVisible && (
        <View style={styles.picker_container}>
          <Picker
            selectedValue={selectedDifficulty}
            onValueChange={(e) => setSelectedDifficulty(e)}
            itemStyle={styles.picker}
          >
            {gradeOptions.map((grade) => (
              <Picker.Item key={grade} label={grade} value={grade} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
}

export default Difficulty;

