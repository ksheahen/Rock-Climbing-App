import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Pressable, Text, View, Modal, TextInput } from "react-native";
import Icon from "react-native-remix-icon";
import MapView, { Marker } from "react-native-maps";
import * as ExpoLocation from "expo-location";
import styles from "./Location.styles.ts";

interface LocationComponentProps {
	selectedProp: string;
	onSelectedChange?: (value: string) => void;
	editToggle: boolean;
}

function Location({ selectedProp, onSelectedChange, editToggle }: LocationComponentProps) {
	const [selectedType, setSelectedType] = useState(selectedProp || "");
	const [modalVisible, setModalVisible] = useState(false);
	const [draft, setDraft] = useState(selectedProp || "");
	const [description, setDescription] = useState(selectedProp || "");
	const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

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

	// fetch location when modal opens
	useEffect(() => {
		if (modalVisible) {
			(async () => {
				const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
				if (status !== "granted") return;

				const loc = await ExpoLocation.getCurrentPositionAsync({
					accuracy: ExpoLocation.Accuracy.Highest,
				});
				setUserLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
				});
			})();
		}
	}, [modalVisible]);

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

				{editToggle ? (
					<Pressable style={styles.dropdown_container} onPress={openModal}>
						<Text style={styles.dropdown}>{selectedType}</Text>
						<View style={styles.icon_container}>
							<Icon name="arrow-drop-down-line" size={24} />
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

						{/* Map */}
						{userLocation && (
							<MapView
								style={{ width: "100%", height: 200, marginVertical: 10 }}
								initialRegion={{
									latitude: userLocation.latitude,
									longitude: userLocation.longitude,
									latitudeDelta: 0.01,
									longitudeDelta: 0.01,
								}}
							>
								<Marker coordinate={userLocation} title="You are here" />
							</MapView>
						)}

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
