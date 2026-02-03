import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Modal, TextInput } from "react-native";
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
	const [modalVisible, setModalVisible] = useState(false);
	const [draft, setDraft] = useState(selectedProp || "");
	const [description, setDescription] = useState(selectedProp || "");

	// Sync internal state with prop whenever the prop changes
	useEffect(() => {
		setSelectedType(selectedProp);
		setDraft(selectedProp);
	}, [selectedProp]);

	// notify parent whenever the state changes
	useEffect(() => {
		if (onSelectedChange) {
			onSelectedChange(selectedType);
		}
	}, [selectedType, onSelectedChange]);


	const openModal = () => {
		if (!editToggle) return; // don't open in view-only mode
		setDraft(description);
		setModalVisible(true);
	};

	const save = () => {
		setDescription(draft);
		setModalVisible(false);
		onSelectedChange?.(draft); // notify parent
	};

	const cancel = () => {
		setModalVisible(false);
		setDraft(description);
	};

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.title}>Location</Text>

				{/* when editToggle = true, show everthing */}
				{/* when editToggle = false, show only view mode*/}
				{editToggle ? (
					<Pressable
						style={styles.dropdown_container}
						onPress={() => setModalVisible(true)}
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

			{/* Modal */}
			<Modal visible={modalVisible} animationType="slide" transparent>
				<View style={styles.modal_backdrop}>
					<View style={styles.modal_card}>
						<Text style={styles.modal_title}>Description</Text>

						<TextInput
							value={draft}
							onChangeText={setDraft}
							style={styles.modal_input}
							multiline
							maxLength={150}
							textAlignVertical="top"
						/>

						<Text style={styles.counter}>{draft.length}/150</Text>

						<View style={styles.modal_actions}>
							<Pressable onPress={cancel} style={styles.btn_secondary}>
								<Text>Cancel</Text>
							</Pressable>

							<Pressable onPress={save} style={styles.btn_primary}>
								<Text style={{ color: "white" }}>Save</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>

		</View>
	);
}

export default Location;
