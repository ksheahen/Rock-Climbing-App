import AnalyticsDateButtons from "@/components/AnalyticsDateButton/AnalyticsDateButtons";
import BackButton from "@/components/BackButton/BackButton";
import LineCharts from "@/components/LineCharts/LineCharts";
import StatCard from "@/components/StatCard/StatCard";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { LocalClimb } from "../../types/LocalClimb";
import styles from "../styles/analytics.styles.";

const Analytics = () => {
  const db = useSQLiteContext();
  const [climbs, setClimbs] = useState<LocalClimb[]>([]);
  const [dates, setDates] = useState<"week" | "month" | "year" | "all time">(
    "week",
  );

  // Fetch climbs from SQLite - runs every time the page comes into focus
  const fetchClimbs = useCallback(async () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    try {
      setLoading(true);
      setError(null);

      // Query all climbs from log_climb5 table, ordered by datetime descending (most recent first)
      const result = await db.getAllAsync<LocalClimb>(
        `SELECT * FROM log_climb5 WHERE deleted = 0 ORDER BY datetime DESC, id DESC LIMIT 50`,
      );

      setClimbs(result);
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to load climbs";
      console.error("Error fetching climbs:", err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [db]);

  // Refresh climbs whenever the screen comes into focus (e.g., after logging a climb)
  useFocusEffect(
    useCallback(() => {
      fetchClimbs();
    }, [fetchClimbs]),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton url="/" />
        <Text style={styles.headerTitle}>PROGRESS</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Stat Cards */}
      <View style={styles.content}>
        <StatCard climbs={climbs} />
      </View>

      {/* Line Chart */}
      <View style={styles.content}>
        <AnalyticsDateButtons dates={dates} onChange={setDates} />
        <LineCharts climbs={climbs} dateRange={dates} />
      </View>
    </ScrollView>
  );
};

export default Analytics;
