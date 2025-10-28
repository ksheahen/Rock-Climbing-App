import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const analytics = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Analytics Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>CLIMBING STATISTICS</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>47</Text>
            <Text style={styles.statLabel}>Routes Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>V8</Text>
            <Text style={styles.statLabel}>Highest Grade</Text>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>PROGRESS OVER TIME</Text>
          <View style={styles.chartPlaceholder} />
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>GRADE DISTRIBUTION</Text>
          <View style={styles.pieChartPlaceholder} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Roboto",
  },
  placeholder: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8E8E93",
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  statLabel: {
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    fontFamily: "Roboto",
  },
  chartSection: {
    marginBottom: 32,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#E5E5EA",
    borderRadius: 12,
  },
  pieChartPlaceholder: {
    height: 200,
    backgroundColor: "#E5E5EA",
    borderRadius: 100,
  },
});

export default analytics;
