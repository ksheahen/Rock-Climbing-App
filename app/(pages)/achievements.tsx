import BackButton from "@/components/BackButton/BackButton";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/achievements";

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

      {/* Line Chart */}
      <View style={styles.content}>
        <Text>CONTENT</Text>
      </View>
    </ScrollView>
  );
}

export default AchievementsPage;
