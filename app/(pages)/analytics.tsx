import AnalyticsDateButtons from "@/components/AnalyticsDateButton/AnalyticsDateButtons";
import BackButton from "@/components/BackButton/BackButton";
import LineCharts from "@/components/LineCharts/LineCharts";
import StatCard from "@/components/StatCard/StatCard";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/analytics";

// Currently a WIP
const Analytics = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton url="/" />
        <Text style={styles.headerTitle}>PROGRESS</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stat Cards */}
      <StatCard />

      {/* Line Chart */}
      <View style={styles.content}>
        <AnalyticsDateButtons />
        <LineCharts />
      </View>
    </ScrollView>
  );
};

export default Analytics;
