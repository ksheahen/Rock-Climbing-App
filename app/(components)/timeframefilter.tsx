import { Pressable, Text, View } from "react-native";
import styles from "../styles/timeframefilter";

function TimeframeFilterComponent() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Day</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Week</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Month</Text>
      </Pressable>
      <Pressable style={styles.button}>
        <Text style={styles.text}>All Time</Text>
      </Pressable>
    </View>
  );
}

export default TimeframeFilterComponent;
