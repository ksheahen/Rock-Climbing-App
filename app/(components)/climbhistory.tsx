import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/climbhistory";

export interface Climb {
  date: string; // YYYY-MM-DD
  time: string;
  grade: string;
  stars: number;
  sub: string;
}

interface Props {
  climbs: Climb[];
  timeframe: "day" | "week" | "month" | "all";
}

function ClimbHistoryComponent({ climbs, timeframe }: Props) {
  const now = new Date();

  const filteredClimbs = climbs.filter((climb) => {
    const climbDate = new Date(climb.date);
    switch (timeframe) {
      case "day":
        return (
          climbDate.getFullYear() === now.getFullYear() &&
          climbDate.getMonth() === now.getMonth() &&
          climbDate.getDate() === now.getDate()
        );
      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return climbDate >= weekAgo && climbDate <= now;
      }
      case "month":
        return (
          climbDate.getFullYear() === now.getFullYear() &&
          climbDate.getMonth() === now.getMonth()
        );
      case "all":
      default:
        return true;
    }
  });

  return (
    <View style={styles.container}>
      {filteredClimbs.map((climb, index) => (
        <View key={index}>
          <Text style={styles.date}>{climb.date}</Text>
          <View style={styles.climbItem}>
            <View style={styles.info}>
              <Text style={styles.time}>{climb.time}</Text>
              <View style={styles.gradeRow}>
                <Icon name="check-line" size={18} />
                <Text style={styles.grade}>{climb.grade}</Text>
                <Text style={styles.stars}>{"★".repeat(climb.stars)}</Text>
              </View>
              <Text style={styles.sub}>{climb.sub}</Text>
            </View>
            <Pressable style={styles.videoButton}>
              <Text style={styles.videoText}>video{"\n"}preview</Text>
            </Pressable>
          </View>
        </View>
      ))}
      {filteredClimbs.length === 0 && <Text style={{ marginTop: 10 }}>No climbs for this timeframe.</Text>}
    </View>
  );
}

export default ClimbHistoryComponent;


