import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "./EarnedAcheivements.styles.ts";

export type EarnedAchievement = {
  achievement_id: string;
  name: string;
  description: string | null;
  badge_icon: string | null;
  earned_at: string;
};

// SAME ICONS as Achievements page
const awardIconsById: Record<string, number> = {
  "highest-grade": require("../../assets/award_highest.png"),
  "streak-starter": require("../../assets/award_streak.png"),
  "flash-master": require("../../assets/award_flash.png"),
};

const defaultAwardIcon = require("../../assets/award_test.png");

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
              <Image
                source={
                  awardIconsById[a.achievement_id] ?? defaultAwardIcon
                }
                style={styles.badgeImage}
                resizeMode="contain"
              />

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