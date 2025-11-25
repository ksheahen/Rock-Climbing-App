import Attempt from "@/components/Attempt/Attempt";
import BackButton from "@/components/BackButton/BackButton";
import Category from "@/components/Category/Category";
import Complete from "@/components/Complete/Complete";
import DateTime from "@/components/DateTime/DateTime";
import Description from "@/components/Description/Description";
import Difficulty from "@/components/Difficulty/Difficulty";
import Line from "@/components/Line/Line";
import Rating from "@/components/Rating/Rating";
import SettingsButton from "@/components/SettingsButton/SettingsButton";
import Type from "@/components/Type/Type";
import { useFocusEffect } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "../styles/individual-climb-page.styles";
import { Link } from "expo-router";
import { Modal } from "react-native";
import { Text } from "react-native";
import { Pressable } from "react-native";
import Icon from "react-native-remix-icon";
import { useRouter } from "expo-router/build/hooks";

// TODO: Make it so that this page
// can also update the values in
// the database using a save button
// also they should be able to delete
// a log

function IndividualClimbPage() {
	const db = useSQLiteContext();
	// default values (local storage)
	const [selectedCategory, setSelectedCategory] = useState("Indoor");
	const [selectedType, setSelectedType] = useState("Boulder");
	const [selectedComplete, setSelectedComplete] = useState("Yes");
	const [selectedAttempt, setSelectedAttempt] = useState("1");
	const [selectedGrade, setSelectedGrade] = useState("4a/V0");
	const [selectedRating, setSelectedRating] = useState(0);
	const [selectedDateTime, setSelectedDateTime] = useState("");
	const [selectedDescription, setSelectedDescription] = useState("");
	const [selectedMedia, setSelectedMedia] = useState("");
	const [editToggle, setEditToggle] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	console.log("----------------------------");
	console.log("Local Storage 'category'  -", selectedCategory);
	console.log("Local Storage 'type'      -", selectedType);
	console.log("Local Storage 'complete'  -", selectedComplete);
	console.log("Local Storage 'attempt'   -", selectedAttempt);
	console.log("Local Storage 'grade'     -", selectedGrade);
	console.log("Local Storage 'rating'    -", selectedRating);
	console.log("Local Storage 'datetime'  -", selectedDateTime);
	console.log("Local Storage 'desc'      -", selectedDescription);
	console.log("Local Storage 'media'     -", selectedMedia);
	console.log("----------------------------");

	// get the id from params of the request
	const searchParams = useSearchParams();
	const paramsid = searchParams.get("id");
	console.log("Request Id      - ", paramsid);

	// LOAD -------------
	const loadClimbs = async () => {
		if (paramsid != null) {
			const result = await db.getAllAsync(
				`SELECT * FROM log_climb3 WHERE id = ?`,
				[paramsid],
			);
			if (result.length > 0) {
				const climbData = result[0] as {
					category: string;
					type: string;
					complete: string;
					attempt: string;
					grade: string;
					rating: number;
					datetime: string;
					description: string;
					media: string;
				};
				// update local state with db values
				setSelectedCategory(climbData.category);
				setSelectedType(climbData.type);
				setSelectedComplete(climbData.complete);
				setSelectedAttempt(climbData.attempt);
				setSelectedGrade(climbData.grade);
				setSelectedRating(climbData.rating);
				setSelectedDateTime(climbData.datetime);
				setSelectedDescription(climbData.description);
				setSelectedMedia(climbData.media);
			}
		}
	};

	// SEND -------------
	const handleSubmit = async () => {
		const climb = {
			category: selectedCategory,
			type: selectedType,
			complete: selectedComplete,
			attempt: selectedAttempt,
			grade: selectedGrade,
			rating: selectedRating,
			datetime: selectedDateTime,
			description: selectedDescription,
			media: selectedMedia,
		};
		// check
		console.log("DB Storage 'category'   -", climb.category);
		console.log("DB Storage 'type'       - ", climb.type);
		console.log("DB Storage 'complete'   - ", climb.complete);
		console.log("DB Storage 'attempt'    - ", climb.attempt);
		console.log("DB Storage 'grade'      - ", climb.grade);
		console.log("DB Storage 'rating'     - ", climb.rating);
		console.log("DB Storage 'datetime'   - ", climb.datetime);
		console.log("DB Storage 'desc'       - ", climb.description);
		console.log("DB Storage 'media'      - ", climb.media);

		// update the db
		await db.runAsync(
			`UPDATE log_climb3 
			SET category = ?, type = ?, complete = ?, attempt = ?, grade = ?, rating = ?, datetime = ?, description = ?, media = ?
			WHERE id = ?`,
			[
				climb.category,
				climb.type,
				climb.complete,
				climb.attempt,
				climb.grade,
				climb.rating,
				climb.datetime,
				climb.description,
				climb.media,
				paramsid,
			]
		);

		console.log("Sent log data to db...");
		setEditToggle(false);
	};

	// trigger loadClimbs whenever the screen is focused
	useFocusEffect(
		useCallback(() => {
			// on focus, load climb data
			loadClimbs();

			// on unfocus, reset editToggle
			return () => {
				setEditToggle(false);
			};
		}, [paramsid]),
	);


	const router = useRouter();
	const handleRedirect = () => {
		router.push(`/profile`);
	};

	const editPress = async () => {
		console.log("edit pressed");
		setModalVisible(false);
		setEditToggle(true);
	};

	const deletePress = async () => {
		await db.runAsync(
			`DELETE FROM log_climb3 WHERE id = ?`, [paramsid]
		);
		console.log("Deleted log from db...");
		setModalVisible(false); // this doesnt really matter
		handleRedirect();
	};

	return (
		<View style={styles.container}>
			<View style={styles.leftright_container}>
				<View style={styles.left}>
					<BackButton />
				</View>
				<View style={styles.right}>
					<SettingsButton modalVisibleProp={modalVisible} onSelectedChange={setModalVisible} />
				</View>
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scroll_container}
			>
				<View style={styles.media}></View>
				<Category
					selectedProp={selectedCategory}
					onSelectedChange={setSelectedCategory}
					editToggle={editToggle}
				/>
				<Line />
				<Type selectedProp={selectedType} onSelectedChange={setSelectedType} editToggle={editToggle} />
				<Line />
				<Complete
					selectedProp={selectedComplete}
					onSelectedChange={setSelectedComplete}
					editToggle={editToggle}
				/>
				<Line />
				<Attempt
					selectedProp={selectedAttempt}
					onSelectedChange={setSelectedAttempt}
					editToggle={editToggle}
				/>
				<Line />
				<Difficulty
					selectedProp={selectedGrade}
					onSelectedChange={setSelectedGrade}
					editToggle={editToggle}
				/>
				<Line />
				<Rating
					selectedProp={selectedRating}
					onSelectedChange={setSelectedRating}
					editToggle={editToggle}
				/>
				<Line />
				<DateTime editToggle={editToggle} />
				<Line />
				<Description />
				{/* only render the button when in edit mode */}
				{editToggle ? (
					<View style={styles.save_container}>
						<Pressable onPress={handleSubmit} style={styles.save_button}>
							<Text style={styles.save_text}>Save</Text>
						</Pressable>
					</View>
				) : (
					<View></View>
				)}
			</ScrollView>

			{/* modal is visible only modalVisible = true */}
			<Modal visible={modalVisible} animationType="slide" transparent={true}>
				{/* overlay */}
				<Pressable style={styles.modal_outter_container} onPress={() => setModalVisible(false)}></Pressable>
				{/* modal */}
				<View style={styles.modal_inner_container}>
					<Pressable style={styles.modal_button} onPress={() => editPress()}>
						<Text style={styles.modal_text}>Edit Climb</Text>
					</Pressable>
					<Pressable style={styles.modal_button} onPress={() => deletePress()}>
						<Text style={styles.modal_text}>Delete Climb</Text>
					</Pressable>
				</View>
			</Modal>

		</View>
	);
}

export default IndividualClimbPage;
