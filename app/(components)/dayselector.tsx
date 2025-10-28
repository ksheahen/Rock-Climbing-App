import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/dayselector";

export interface DayData {
  day: string;
  date: string;
  status: "red" | "green" | "selected" | "default";
}

interface DaySelectorProps {
  days: DayData[];
  onDayPress?: (index: number) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  onDayPress,
}) => {
  return (
    <View style={styles.daySelector}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dayCircle,
            day.status === "red" && styles.dayRed,
            day.status === "green" && styles.dayGreen,
            day.status === "selected" && styles.daySelected,
          ]}
          onPress={() => onDayPress?.(index)}
        >
          <Text
            style={[
              styles.dayText,
              day.status === "selected" && styles.dayTextSelected,
            ]}
          >
            {day.day}
          </Text>
          <Text
            style={[
              styles.dateText,
              day.status === "selected" && styles.dateTextSelected,
            ]}
          >
            {day.date}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
