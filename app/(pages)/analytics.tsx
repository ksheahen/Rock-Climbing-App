import AnalyticsDateButtons from "@/components/AnalyticsDateButton/AnalyticsDateButtons";
import BackButton from "@/components/BackButton/BackButton";
import LineCharts from "@/components/LineCharts/LineCharts";
import StatCard from "@/components/StatCard/StatCard";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { LocalClimb } from "../../types/LocalClimb";
import styles from "../styles/analytics.styles.";

// Currently a WIP
const Analytics = () => {
  const db = useSQLiteContext();
  const [climbsArr, setClimbsArr] = useState<LocalClimb[]>([]);
  const [dates, setDates] = useState<"week" | "month" | "year" | "all time">(
    "week",
  );

  useEffect(() => {
    let mounted = true;
    const loadClimbs = async () => {
      try {
        const rows = await db.getAllAsync(
          `SELECT * FROM log_climb5 ORDER BY id DESC LIMIT 50`,
          [],
        );
        if (!mounted) return;
        setClimbsArr(Array.isArray(rows) ? (rows as LocalClimb[]) : []);
      } catch (err) {
        console.error("Failed to load climbs for analytics", err);
      }
    };

    loadClimbs();
    return () => {
      mounted = false;
    };
  }, [db]);

  // Refetch when screen gains focus so UI (StatCard, charts) updates after DB changes
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const loadClimbsOnFocus = async () => {
        try {
          const rows = await db.getAllAsync(
            `SELECT * FROM log_climb5 ORDER BY id DESC LIMIT 50`,
            [],
          );
          if (!mounted) return;
          setClimbsArr(Array.isArray(rows) ? (rows as LocalClimb[]) : []);
        } catch (err) {
          console.error("Failed to load climbs on focus", err);
        }
      };
      loadClimbsOnFocus();
      return () => {
        mounted = false;
      };
    }, [db]),
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
