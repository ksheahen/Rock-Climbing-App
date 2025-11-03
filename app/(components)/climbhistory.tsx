import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/climbhistory";

export interface Climb {
  date: string;
  displayDate?: string;
  time: string;
  grade: string;
  stars: number;
  sub: string;
}

interface Props {
  climbs: Climb[];
}

function ClimbHistoryComponent({ climbs }: Props) {
  return (
    <View style={styles.container}>
      {climbs.map((climb, index) => (
        <View key={index}>
          <Text style={styles.date}>{climb.displayDate ?? climb.date}</Text>
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
      {climbs.length === 0 && (
        <Text style={{ marginTop: 10 }}>No climbs for this timeframe.</Text>
      )}
    </View>
  );
}

export default ClimbHistoryComponent;
