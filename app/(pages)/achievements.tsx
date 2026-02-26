import BackButton from "@/components/BackButton/BackButton";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/achievements";

function AchievementsPage() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton url="/profile" />
        <Text style={styles.headerTitle}>Achievements</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Line Chart */}
      <View style={styles.content}>
        <Text>CONTENT</Text>
      </View>
    </ScrollView>
  );
}

export default AchievementsPage;
