import BackButton from "@/components/BackButton/BackButton";
import { DEFAULT_ACHIEVEMENTS } from "@/components/Achievements/achievements";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "../styles/achievements";

const awardIcon = require("../../assets/award_test.png");

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
            <Image source={awardIcon} style={styles.awardImage} />
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
