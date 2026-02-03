import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Location.styles.ts";

interface LocationComponentProps {
	selectedProp: string;
	onSelectedChange?: (value: string) => void;
	editToggle: boolean;
}

function Location({
	selectedProp,
	onSelectedChange,
	editToggle,
}: LocationComponentProps) {
	const [selectedType, setSelectedType] = useState(selectedProp || "");
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
				<Text style={styles.title}>Location</Text>

				{/* when editToggle = true, show everthing */}
				{/* when editToggle = false, show only view mode*/}
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
						<Picker.Item label="Test" value="" />
						<Picker.Item label="No" value="No" />
					</Picker>
				</View>
			)}
		</View>
	);
}

export default Location;
