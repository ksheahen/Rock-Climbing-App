import React from "react";
import { ScrollView, Text, View } from "react-native";
import { ClimbCard, ClimbData } from "../ClimbCard/ClimbCard";
import { styles } from "./RecentClimbs.styles";

export interface RecentClimbsProps {
  climbs: ClimbData[];
  onClimbPress?: (id: number) => void;
  onClimbDelete?: (id: number) => void;
}

export const RecentClimbs: React.FC<RecentClimbsProps> = ({
  climbs,
  onClimbPress,
  onClimbDelete,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>RECENT CLIMBS</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={styles.climbsScroll}
      >
        {climbs.map((climb) => (
          <ClimbCard
            key={climb.id}
            climb={climb}
            onPress={() => onClimbPress?.(climb.id)}
            onDelete={() => onClimbDelete?.(climb.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
