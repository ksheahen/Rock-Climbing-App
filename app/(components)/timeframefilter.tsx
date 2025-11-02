import { Pressable, Text, View } from "react-native";
import styles from "../styles/timeframefilter";

interface Props {
  timeframe: "day" | "week" | "month" | "all";
  setTimeframe: (tf: "day" | "week" | "month" | "all") => void;
}

function TimeframeFilterComponent({ timeframe, setTimeframe }: Props) {
  return (
    <View style={styles.container}>
      {["day", "week", "month", "all"].map((tf) => (
        <Pressable
          key={tf}
          style={[
            styles.button,
            timeframe === tf && { backgroundColor: "#555" }, // highlight selected
          ]}
          onPress={() => setTimeframe(tf as any)}
        >
          <Text style={styles.text}>{tf === "all" ? "All Time" : tf.charAt(0).toUpperCase() + tf.slice(1)}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default TimeframeFilterComponent;


