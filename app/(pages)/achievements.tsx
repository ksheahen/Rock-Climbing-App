import BackButton from "@/components/BackButton/BackButton";
import { Image, ScrollView, Text, View } from "react-native";
import styles from "../styles/achievements";

const awardIcon = require("../../assets/award_test.png");

const AVAILABLE_AWARDS = [
  {
    id: "highest-grade",
    name: "Highest Grade Climbed",
    description: "Send your hardest grade to unlock this achievement.",
  },
  {
    id: "x-point-day",
    name: "X Point Day",
    description: "Earn 100 points in a single climbing session.",
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    description: "Log climbs on 3 consecutive days.",
  },
  {
    id: "flash-master",
    name: "Flash Master",
    description: "Complete 5 climbs on your first attempt.",
  },
  {
    id: "session-crusher",
    name: "Session Crusher",
    description: "Finish 20 total climbs in one day.",
  },
];

function AchievementsPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backbtnContainer}>
          <BackButton url="/profile" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Achievements</Text>
        </View>
      </View>

      <View style={styles.content}>
        {AVAILABLE_AWARDS.map((award) => (
          <View key={award.id} style={styles.awardRow}>
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
