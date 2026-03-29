import { DEFAULT_ACHIEVEMENTS } from "@/components/Achievements/achievements";
import BackButton from "@/components/BackButton/BackButton";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "../styles/achievements";

const awardIconsById: Record<string, number> = {
  "highest-grade": require("../../assets/award_highest.png"),
  "advanced-grade": require("../../assets/award_highest.png"),
  "intermediate-grade": require("../../assets/award_highest.png"),
  "beginner-grade": require("../../assets/award_highest.png"),
  "streak-starter": require("../../assets/award_streak.png"),
  "flash-master": require("../../assets/award_flash.png"),
};

const defaultAwardIcon = require("../../assets/award_test.png");

function AchievementsPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.backbtnContainer}>
          <BackButton url="/profile" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Achievements</Text>
        </View>
      </View>

      <View style={styles.content}>
        {DEFAULT_ACHIEVEMENTS.map((award) => (
          <View key={award.achievement_id} style={styles.awardRow}>
            <Image
              source={awardIconsById[award.achievement_id] ?? defaultAwardIcon}
              style={styles.awardImage}
              resizeMode="contain"
            />
            <View style={styles.awardTextContainer}>
              <Text style={styles.awardName}>{award.name}</Text>
              <Text style={styles.awardDescription}>{award.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export default AchievementsPage;
