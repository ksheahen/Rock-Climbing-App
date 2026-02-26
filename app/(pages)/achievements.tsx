import { StyleSheet, Text, View } from "react-native";

function AchievementsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basic Page</Text>
      <Text>This is a simple starter screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
});

export default AchievementsPage;
