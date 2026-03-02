import { ClimbCard, ClimbData } from "@/components/ClimbCard/ClimbCard";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "./ClimbHistory.styles";

type ClimbHistoryProps = {
  climbs: ClimbData[];
  dates: "day" | "week" | "month" | "all";
  onDelete: (id: number) => Promise<void>;
};

// NOTE: Had to kick the climbs (and the delete func) over to the profile page to be able to filter
// it by time.. I tested the delete and sync features but will leave code just in case it's broken
function ClimbHistory({ climbs, onDelete }: ClimbHistoryProps) {
  const db = useSQLiteContext();
  const router = useRouter();

  // const [climbs, setClimbs] = useState<ClimbData[]>([]);

  // const loadClimbs = async () => {
  //   const results = (await db.getAllAsync(
  //     `SELECT * FROM log_climb5 WHERE deleted = 0 ORDER BY id DESC`,
  //   )) as ClimbData[];
  //   setClimbs(results);
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     loadClimbs();
  //   }, []),
  // );

  const handleRedirect = (id: number) => {
    router.push(`/individual-climb-page?id=${id}&from=profile`);
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     await db.runAsync(
  //       `UPDATE log_climb5
  //      		SET deleted = 1,
  //          	synced = 0
  //      		WHERE id = ?`,
  //       [id],
  //     );
  //     setClimbs((prev) => prev.filter((c) => c.id !== id));
  //   } catch (error) {
  //     console.error("Failed to delete climb:", error);
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      {climbs.map((climb) => (
        <View key={climb.id} style={{ marginBottom: 12 }}>
          <ClimbCard
            climb={climb}
            onPress={() => handleRedirect(climb.id)}
            onDelete={() => onDelete(climb.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
export default ClimbHistory;
