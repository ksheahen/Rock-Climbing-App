import AnalyticsDateButtons from "@/components/AnalyticsDateButton/AnalyticsDateButtons";
import BackButton from "@/components/BackButton/BackButton";
import LineCharts from "@/components/LineCharts/LineCharts";
import StatCard from "@/components/StatCard/StatCard";
import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import styles from "../styles/analytics.styles.";

// Currently a WIP
const Analytics = () => {
  type ClimbRow = { id?: string; grade?: string };
  const db = useSQLiteContext();
  const [climbsArr, setClimbsArr] = useState<ClimbRow[]>([]);

  const [dates, setDates] = useState<"week" | "month" | "year" | "all time">(
    "month",
  );

  useEffect(() => {
    let mounted = true;
    const loadClimbs = async () => {
      try {
        const rows = await db.getAllAsync(`SELECT * FROM log_climb3`, []);
        if (!mounted) return;
        setClimbsArr(Array.isArray(rows) ? (rows as ClimbRow[]) : []);
      } catch (err) {
        console.error("Failed to load climbs for analytics", err);
      }
    };

    loadClimbs();
    return () => {
      mounted = false;
    };
  }, [db]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton url="/" />
        <Text style={styles.headerTitle}>PROGRESS</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stat Cards */}
      <StatCard climbs={climbsArr} />

      {/* Line Chart */}
      <View style={styles.content}>
        <AnalyticsDateButtons dates={dates} onChange={setDates} />
        <LineCharts climbs={climbsArr} dateRange={dates} />
      </View>
    </ScrollView>
  );
};

export default Analytics;
