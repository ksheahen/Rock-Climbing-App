import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Difficulty.styles";

interface GradeComponentProps {
	selectedProp: string;
	onSelectedChange?: (value: string) => void;
	editToggle: boolean;
}

function Difficulty({ selectedProp, onSelectedChange, editToggle }: GradeComponentProps) {
	const [selectedDifficulty, setSelectedDifficulty] = useState(
		selectedProp || "4a/V0",
	);
	const [isPickerVisible, setIsPickerVisible] = useState(false);

	// notify parent whenever the state changes
	useEffect(() => {
		if (onSelectedChange) {
			onSelectedChange(selectedDifficulty);
		}
	}, [selectedDifficulty, onSelectedChange]);

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.title}>Grade</Text>
				{/* when editToggle = true, show everthing */}
				{/* when editToggle = false, show just view mode */}
				{editToggle ? (
					<Pressable
						style={styles.dropdown_container}
						onPress={() => setIsPickerVisible(!isPickerVisible)}
					>
						<Text style={styles.dropdown}>{selectedDifficulty}</Text>
						<View style={styles.icon_container}>
							<Icon name="arrow-drop-down-line" size="24"></Icon>
						</View>
					</Pressable>
				) : (
					<View style={styles.dropdown_container}>
						<Text style={styles.dropdown}>{selectedDifficulty}</Text>
					</View>
				)}
			</View>

			{/* conditionally render the picker */}
			{editToggle && isPickerVisible && (
				<View style={styles.picker_container}>
					<Picker
						selectedValue={selectedDifficulty}
						onValueChange={(e) => setSelectedDifficulty(e)}
						itemStyle={styles.picker}
					>
						<Picker.Item label="4a/V0" value="4a/V0" />
						<Picker.Item label="4b/V0" value="4b/V0" />
						<Picker.Item label="4c/V0" value="4c/V0" />
						<Picker.Item label="5a/V1" value="5a/V1" />
						<Picker.Item label="5b/V1" value="5b/V1" />
						<Picker.Item label="5c/V2" value="5c/V2" />
						<Picker.Item label="6a/V3" value="6a/V3" />
						<Picker.Item label="6a+/V3" value="6a+/V3" />
						<Picker.Item label="6b/V4" value="6b/V4" />
						<Picker.Item label="6b+/V4" value="6b+/V4" />
						<Picker.Item label="6c/V5" value="6c/V5" />
						<Picker.Item label="6c+/V5" value="6c+/V5" />
						<Picker.Item label="7a/V6" value="7a/V6" />
						<Picker.Item label="7a+/V7" value="7a+/V7" />
						<Picker.Item label="7b/V8" value="7b/V8" />
						<Picker.Item label="7b+/V8" value="7b+/V8" />
						<Picker.Item label="7c/V9" value="7c/V9" />
						<Picker.Item label="7c+/V10" value="7c+/V10" />
						<Picker.Item label="8a/V11" value="8a/V11" />
						<Picker.Item label="8a+/V12" value="8a+/V12" />
						<Picker.Item label="8b/V13" value="8b/V13" />
						<Picker.Item label="8b+/V14" value="8b+/V14" />
						<Picker.Item label="8c/V15" value="8c/V15" />
						<Picker.Item label="8c+/V16" value="8c+/V16" />
						<Picker.Item label="9a/V17" value="9a/V17" />
					</Picker>
				</View>
			)}
		</View>
	);
}

export default Difficulty;
