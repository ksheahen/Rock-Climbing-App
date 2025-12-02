import { Text, TouchableOpacity, View } from "react-native";
import styles from "./TimeframeFilter.styles";

interface TimeframeFilterProps {
  dates: "day" | "week" | "month" | "all";
  onChange: (tf: "day" | "week" | "month" | "all") => void;
}
function TimeframeFilter({ dates, onChange }: TimeframeFilterProps) {
  return (
    <View style={styles.dateRow}>
      {/* Day */}
      <TouchableOpacity
        style={[styles.dateButton, dates === "day" && styles.dateButtonActive]}
        onPress={() => onChange("day")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "day" && styles.dateButtonTextActive,
          ]}
        >
          Day
        </Text>
      </TouchableOpacity>

      {/* Week */}
      <TouchableOpacity
        style={[styles.dateButton, dates === "week" && styles.dateButtonActive]}
        onPress={() => onChange("week")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "week" && styles.dateButtonTextActive,
          ]}
        >
          Week
        </Text>
      </TouchableOpacity>

      {/* Month */}
      <TouchableOpacity
        style={[
          styles.dateButton,
          dates === "month" && styles.dateButtonActive,
        ]}
        onPress={() => onChange("month")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "month" && styles.dateButtonTextActive,
          ]}
        >
          Month
        </Text>
      </TouchableOpacity>

      {/* All Time */}
      <TouchableOpacity
        style={[styles.dateButton, dates === "all" && styles.dateButtonActive]}
        onPress={() => onChange("all")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "all" && styles.dateButtonTextActive,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
    </View>
  );

  //   <View style={styles.container}>
  //   {["day", "week", "month", "all"].map((tf) => (
  //     <Pressable
  //       key={tf}
  //       style={[
  //         styles.button,
  //         timeframe === tf && { backgroundColor: "#555" }, // highlight selected
  //       ]}
  //       onPress={() => setTimeframe(tf as any)}
  //     >
  //       <Text style={styles.text}>
  //         {tf === "all"
  //           ? "All Time"
  //           : tf.charAt(0).toUpperCase() + tf.slice(1)}
  //       </Text>
  //     </Pressable>
  //   ))}
  // </View>
  // <View style={styles.container}>
  //   <Pressable style={styles.selected_button}>
  //     <Text style={styles.selected_text}>Day</Text>
  //   </Pressable>
  //   <Pressable style={styles.button}>
  //     <Text style={styles.text}>Week</Text>
  //   </Pressable>
  //   <Pressable style={styles.button}>
  //     <Text style={styles.text}>Month</Text>
  //   </Pressable>
  //   <Pressable style={styles.button}>
  //     <Text style={styles.text}>All Time</Text>
  //   </Pressable>
  // </View>
}

export default TimeframeFilter;
