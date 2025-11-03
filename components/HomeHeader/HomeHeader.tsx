import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./HomeHeader.styles";

export interface HomeHeaderProps {
  streakCount: number;
  onFilterPress?: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  streakCount,
  onFilterPress,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Logo</Text>
      <View style={styles.headerRight}>
        <View style={styles.flameBadge}>
          <Ionicons name="flame" size={12} color="#FF3B30" />
          <Text style={styles.flameText}>{streakCount}</Text>
        </View>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Text style={styles.filterText}>Filter</Text>
            <Ionicons name="chevron-down" size={12} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

