import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-remix-icon";
import Line from "../Line/Line";
import styles from "./ClimbHistory.styles";
import { global } from "@/theme";
import { Ionicons } from "@expo/vector-icons";

type Log = {
	id: number;
	category: string;
	type: string;
	grade: string;
	attempt: string;
	complete: string;
	rating: number;
	description: string;
	media: string;
	datetime: string;
};

//TODO : we are going to have to group climbs by date
// we might have to move all of this logic to the page
// so that filters work in the future

function ClimbHistory() {
	const db = useSQLiteContext();

	const router = useRouter();
	const handleRedirect = (id: number) => {
		router.push(`/individual-climb-page?id=${id}`);
	};

	//LOAD -------------
	const [climbs, setClimbs] = useState<Log[]>([]);

	const loadClimbs = async () => {
		// get all climbs in order desc
		const results = (await db.getAllAsync(
			`SELECT * FROM log_climb3 ORDER BY id DESC`,
		)) as Log[];
		setClimbs(results);

		results.forEach((log, index) => {
			console.log("----------------");
			console.log(`Climb Id: ${log.id}`);
			console.log(`Category: ${log.category}`);
			console.log(`Type: ${log.type}`);
			console.log(`Complete: ${log.complete}`);
			console.log(`Attempt: ${log.attempt}`);
			console.log(`Grade: ${log.grade}`);
			console.log(`Rating: ${log.rating}`);
			console.log(`DateTime: ${log.datetime}`);
			console.log(`Description: ${log.description}`);
			console.log(`Media: ${log.media}`);
			console.log("----------------");
		});
	};

	const renderStars = (count: number) => {
		return Array.from({ length: 3 }, (_, i) => (
			<Ionicons
				key={i}
				name="star"
				size={14}
				color={i < count ? global.colors.yellow : global.colors.background_2}
			/>
		));
	};

	// Trigger loadClimbs whenever the screen is focused
	useFocusEffect(
		useCallback(() => {
			loadClimbs();
		}, []),
	);

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.date}>2025-08-18 *FIXME</Text>
			<Line />
			{climbs.map((climb) => (
				<View key={climb.id} style={styles.mini_container}>
					<TouchableOpacity onPress={() => handleRedirect(climb.id)}>
						<Text style={styles.time}>6:55 PM *FIXME</Text>
						<View style={styles.gradeRow}>
							<Icon name="check-line" size="18" />
							<Text style={styles.grade}>{climb.grade}</Text>
							<View style={styles.stars}> {renderStars(climb.rating)}</View>
						</View>
						<View style={styles.tries}>
							<Text>{climb.attempt} Tries</Text>
						</View>
					</TouchableOpacity>
				</View>
			))}
		</ScrollView>
	);
}

export default ClimbHistory;
