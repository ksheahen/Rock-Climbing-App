import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./AnalyticsDateButtons.styles";

// Buttons specifically for filtering by date range on the Analytics page
function AnalyticsDateButtons() {
  const [dates, setDates] = useState<"week" | "month" | "year" | "all time">(
    "month",
  );
  return (
    <View style={styles.dateRow}>
      {/* Week */}
      <TouchableOpacity
        style={[styles.dateButton, dates === "week" && styles.dateButtonActive]}
        onPress={() => setDates("week")}
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
        onPress={() => setDates("month")}
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

      {/* Year */}
      <TouchableOpacity
        style={[styles.dateButton, dates === "year" && styles.dateButtonActive]}
        onPress={() => setDates("year")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "year" && styles.dateButtonTextActive,
          ]}
        >
          Year
        </Text>
      </TouchableOpacity>

      {/* All Time */}
      <TouchableOpacity
        style={[
          styles.dateButton,
          dates === "all time" && styles.dateButtonActive,
        ]}
        onPress={() => setDates("all time")}
      >
        <Text
          style={[
            styles.dateButtonText,
            dates === "all time" && styles.dateButtonTextActive,
          ]}
        >
          All Time
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default AnalyticsDateButtons;
