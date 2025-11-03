import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./AnalyticsPreview.styles";

export interface AnalyticsPreviewProps {
  onPress?: () => void;
}

export const AnalyticsPreview: React.FC<AnalyticsPreviewProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.analyticsSection} onPress={onPress}>
      <View style={styles.analyticsHeader}>
        <Text style={styles.sectionTitle}>ANALYTICS</Text>
        <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
      </View>
      <View style={styles.analyticsContainer}>
        <View style={styles.analyticsCard}>
          <View style={styles.chartPlaceholder} />
        </View>
        <View style={styles.analyticsCard}>
          <View style={styles.circularPlaceholder} />
          <View style={styles.smallChartPlaceholder} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

