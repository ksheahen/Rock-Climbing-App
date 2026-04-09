import { ClimbCard, ClimbData } from "@/components/ClimbCard/ClimbCard";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { ScrollView, Text, View } from "react-native";
import styles from "./ClimbHistory.styles";

type ClimbHistoryProps = {
  climbs: ClimbData[];
  dates: "day" | "week" | "month" | "all";
  onDelete: (id: number) => Promise<void>;
};

function ClimbHistory({ climbs, onDelete }: ClimbHistoryProps) {
  const db = useSQLiteContext();
  const router = useRouter();

  const handleRedirect = (id: number) => {
    router.push(`/individual-climb-page?id=${id}&from=profile`);
  };

  return (
    <ScrollView style={styles.container}>
      {climbs.length === 0 ? (
        <View style={{ padding: 20, alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#888" }}>
            No Current Activity
          </Text>
        </View>
      ) : (
        climbs.map((climb) => (
          <View key={climb.id} style={{ marginBottom: 12 }}>
            <ClimbCard
              climb={climb}
              onPress={() => handleRedirect(climb.id)}
              onDelete={() => onDelete(climb.id)}
            />
          </View>
        ))
      )}
    </ScrollView>
  );
}

export default ClimbHistory;
