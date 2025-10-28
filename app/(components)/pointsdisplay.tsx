import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/pointsdisplay";

interface PointsDisplayProps {
  points: number;
  subtitle: string;
}

export const PointsDisplay: React.FC<PointsDisplayProps> = ({
  points,
  subtitle,
}) => {
  return (
    <View style={styles.pointsSection}>
      <Text style={styles.pointsTitle}>{points} V Points</Text>
      <Text style={styles.pointsSubtitle}>{subtitle}</Text>
    </View>
  );
};
