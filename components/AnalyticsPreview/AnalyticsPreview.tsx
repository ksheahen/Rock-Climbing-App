import StatCard from "@/components/StatCard/StatCard";
import { LocalClimb } from "@/types/LocalClimb";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./AnalyticsPreview.styles";

export interface AnalyticsPreviewProps {
  onPress?: () => void;
  climbs?: LocalClimb[];
}

export const AnalyticsPreview: React.FC<AnalyticsPreviewProps> = ({
  onPress,
  climbs = [],
}) => {
  return (
    <TouchableOpacity style={styles.section} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.sectionTitle}> ANALYTICS </Text>
      <StatCard climbs={climbs} />
    </TouchableOpacity>
  );
};
