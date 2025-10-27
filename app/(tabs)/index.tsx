import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const index = () => {
  const days = [
    { day: "S", date: "20", status: "red" },
    { day: "S", date: "21", status: "green" },
    { day: "M", date: "22", status: "green" },
    { day: "T", date: "23", status: "selected" },
    { day: "W", date: "24", status: "default" },
    { day: "T", date: "25", status: "default" },
    { day: "F", date: "26", status: "default" },
  ];

  const sessions = [
    { grade: "V10", tries: "3 Tries", stars: 2, date: "9/22/25" },
    { grade: "V8", tries: "10+ Tries", stars: 3, date: "9/22/25" },
    { grade: "V7", tries: "5 Tries", stars: 2, date: "9/21/25" },
  ];

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Ionicons
        key={i}
        name="star"
        size={12}
        color={i < count ? "#FFD700" : "#E5E5EA"}
      />
    ));
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Logo</Text>
        <View style={styles.headerRight}>
          <View style={styles.flameBadge}>
            <Ionicons name="flame" size={12} color="#FF3B30" />
            <Text style={styles.flameText}>2</Text>
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Filter</Text>
              <Ionicons name="chevron-down" size={12} color="#8E8E93" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* V Points Display */}
      <View style={styles.pointsSection}>
        <Text style={styles.pointsTitle}>104 V Points</Text>
        <Text style={styles.pointsSubtitle}>This week</Text>
      </View>

      {/* Day Selector */}
      <View style={styles.daySelector}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayCircle,
              day.status === "red" && styles.dayRed,
              day.status === "green" && styles.dayGreen,
              day.status === "selected" && styles.daySelected,
            ]}
          >
            <Text
              style={[
                styles.dayText,
                day.status === "selected" && styles.dayTextSelected,
              ]}
            >
              {day.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                day.status === "selected" && styles.dateTextSelected,
              ]}
            >
              {day.date}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Sessions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RECENT SESSIONS</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.sessionsScroll}
        >
          {sessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <View style={styles.sessionImagePlaceholder} />
              <View style={styles.sessionInfo}>
                <Text style={styles.sessionGrade}>{session.grade}</Text>
                <Text style={styles.sessionTries}>{session.tries}</Text>
                <View style={styles.sessionBottom}>
                  <View style={styles.starsContainer}>
                    {renderStars(session.stars)}
                  </View>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Analytics */}
      <TouchableOpacity
        style={styles.analyticsSection}
        onPress={() => router.push("/analytics")}
      >
        <View style={styles.analyticsHeader}>
          <Text style={styles.sectionTitle}>ANALYTICS</Text>
          <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
        </View>
        <View style={styles.analyticsContainer}>
          <View style={styles.analyticsCard}>
            <View style={styles.chartPlaceholder} />
          </View>
          <View style={styles.analyticsCard}>
            <View style={styles.circularPlaceholder} />
            <View style={styles.smallChartPlaceholder} />
          </View>
        </View>
      </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    fontFamily: "Roboto",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  filterContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  flameBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    width: 60,
    marginTop: 2,
  },
  flameText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FF3B30",
    fontFamily: "Roboto",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#E5E5EA",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    width: 60,
  },
  filterText: {
    fontSize: 14,
    color: "#8E8E93",
    fontFamily: "Roboto",
  },
  pointsSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  pointsTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto",
  },
  pointsSubtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 4,
    fontFamily: "Roboto",
  },
  daySelector: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E5E5EA",
    alignItems: "center",
    justifyContent: "center",
  },
  dayRed: {
    backgroundColor: "#FF3B30",
  },
  dayGreen: {
    backgroundColor: "#34C759",
  },
  daySelected: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#000",
  },
  dayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
    fontFamily: "Roboto",
  },
  dayTextSelected: {
    color: "#000",
  },
  dateText: {
    fontSize: 10,
    color: "#FFF",
    marginTop: -2,
    fontFamily: "Roboto",
  },
  dateTextSelected: {
    color: "#000",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  analyticsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8E8E93",
    marginBottom: 16,
    letterSpacing: 0.5,
    fontFamily: "Roboto",
  },
  analyticsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sessionsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  sessionCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  sessionImagePlaceholder: {
    height: 100,
    backgroundColor: "#E5E5EA",
  },
  sessionInfo: {
    padding: 12,
  },
  sessionGrade: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Roboto",
  },
  sessionTries: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
    fontFamily: "Roboto",
  },
  sessionBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 2,
  },
  sessionDate: {
    fontSize: 12,
    color: "#8E8E93",
    fontFamily: "Roboto",
  },
  analyticsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  analyticsCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  chartPlaceholder: {
    width: "100%",
    height: 120,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
  },
  circularPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E5E5EA",
    marginBottom: 12,
  },
  smallChartPlaceholder: {
    width: "100%",
    height: 40,
    backgroundColor: "#E5E5EA",
    borderRadius: 8,
  },
});

export default index;