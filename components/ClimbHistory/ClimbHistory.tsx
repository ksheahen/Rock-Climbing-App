import { ClimbCard, ClimbData } from "@/components/ClimbCard/ClimbCard";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView, View } from "react-native";
import styles from "./ClimbHistory.styles";

interface ClimbHistoryProps {
  dates: "day" | "week" | "month" | "all";
  climbs: ClimbData[];
}

function ClimbHistory({ climbs }: ClimbHistoryProps) {
  const db = useSQLiteContext();
  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/individual-climb-page?id=${id}&from=profile`);
  };

  const handleDelete = async (id: number) => {
    try {
      await db.runAsync(
        `UPDATE log_climb5
       		SET deleted = 1,
           	synced = 0
       		WHERE id = ?`,
        [id],
      );
    } catch (error) {
      console.error("Failed to delete climb:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {climbs.map((climb) => (
        <View key={climb.id} style={{ marginBottom: 12 }}>
          <ClimbCard
            climb={climb}
            onPress={() => handleRedirect(climb.id)}
            onDelete={() => handleDelete(climb.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
export default ClimbHistory;
