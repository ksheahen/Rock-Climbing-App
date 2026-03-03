import React from "react";
import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./EarnedAcheivements.styles.ts";

export type EarnedAchievement = {
  achievement_id: string;
  name: string;
  description: string | null;
  badge_icon: string | null; // icon_key like "trophy"
  earned_at: string;
};

function iconName(iconKey?: string | null) {
  switch (iconKey) {
    case "trophy":
      return "award-line";
    default:
      return "medal-line";
  }
}

export default function AchievementsRow({
  achievements,
}: {
  achievements: EarnedAchievement[];
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {achievements.length === 0 ? (
          <Text style={styles.emptyText}>No achievements yet</Text>
        ) : (
          achievements.map((a) => (
            <View key={a.achievement_id} style={styles.card}>
              <Icon name={iconName(a.badge_icon)} size={24} color="#FFD700" />
              <Text style={styles.cardTitle}>{a.name}</Text>
              {!!a.description && (
                <Text style={styles.cardDesc}>{a.description}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
