import { Pressable } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./SettingsButton.styles";
import { useEffect, useState } from "react";

interface SettingsButtonProps {
	modalVisibleProp: boolean;
	onSelectedChange?: (value: boolean) => void;
}

function SettingsButton({ modalVisibleProp, onSelectedChange }: SettingsButtonProps) {
	const [modalVisible, setModalVisible] = useState(modalVisibleProp)
	console.log("componenet modalVisible:", modalVisible);

	// Sync internal state with prop whenever the prop changes
	useEffect(() => {
		setModalVisible(modalVisibleProp);
	}, [modalVisibleProp]);

	// Notify parent whenever the internal state changes
	useEffect(() => {
		if (onSelectedChange) {
			onSelectedChange(modalVisible);
		}
	}, [modalVisible, onSelectedChange]);

	return (
		<Pressable style={styles.container} onPress={() => setModalVisible(!modalVisible)}>
			<Icon name="settings-3-line" size="24"></Icon>
		</Pressable>
	);
}

export default SettingsButton;
