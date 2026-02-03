import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {
  AnalyticsPreview,
  DayData,
  DaySelector,
  FilterModal,
  FilterOptions,
  HomeHeader,
  PointsDisplay,
  RecentSessions,
  SessionData,
} from "../../components";
import { LocalClimb } from "../../types/LocalClimb";
import styles from "../styles/index.styles";

const Index = () => {
  const db = useSQLiteContext();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    grades: [],
    tries: [],
    stars: [],
    dateRange: "all",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [climbs, setClimbs] = useState<LocalClimb[]>([]);

  // Fetch climbs from SQLite - runs every time the page comes into focus
  const fetchClimbs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Query all climbs from log_climb3 table, ordered by datetime descending (most recent first)
      const result = await db.getAllAsync<LocalClimb>(
        `SELECT * FROM log_climb3 ORDER BY datetime DESC, id DESC LIMIT 50`
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
    }, [fetchClimbs])
  );

  // Convert climbs to SessionData format for UI
  const allSessionsData: SessionData[] = useMemo(() => {
    return climbs.map((climb) => {
      // Format date
      let formattedDate = "N/A";
      if (climb.datetime) {
        try {
          const date = new Date(climb.datetime);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toLocaleDateString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "2-digit",
            });
          }
        } catch {
          formattedDate = "N/A";
        }
      }

      // Format attempts
      const attemptNum = parseInt(climb.attempt) || 1;
      const tries = `${attemptNum} ${attemptNum === 1 ? "Try" : "Tries"}`;

      // Extract first image URI from climb.media
      let imageUri: string | null = null;
      if (climb.media) {
        try {
          const parsed = JSON.parse(climb.media) as {
            uri: string;
            type: "image" | "video";
          }[];

          if (Array.isArray(parsed) && parsed.length > 0) {
            const firstImage =
              parsed.find((m) => m.type === "image") || parsed[0];
            imageUri = firstImage?.uri ?? null;
          }
        } catch (e) {
          console.warn("Failed to parse media JSON:", e);
          imageUri = null;
        }
      }

      return {
        grade: climb.grade,
        tries,
        stars: climb.rating || 0,
        date: formattedDate,
        imageUri,
      };
    });
  }, [climbs]);

  const days: DayData[] = [
    { day: "S", date: "20", status: "red" },
    { day: "S", date: "21", status: "green" },
    { day: "M", date: "22", status: "green" },
    { day: "T", date: "23", status: "selected" },
    { day: "W", date: "24", status: "default" },
    { day: "T", date: "25", status: "default" },
    { day: "F", date: "26", status: "default" },
  ];

  // Helper function to match tries filter
  const matchesTries = (tries: string, filterValue: string): boolean => {
    const triesNum = parseInt(tries.split(" ")[0]);

    switch (filterValue) {
      case "1-2":
        return triesNum >= 1 && triesNum <= 2;
      case "3-5":
        return triesNum >= 3 && triesNum <= 5;
      case "6-10":
        return triesNum >= 6 && triesNum <= 10;
      case "10+":
        return tries.includes("10+") || triesNum > 10;
      default:
        return true;
    }
  };

  // Filtered sessions based on current filters
  const filteredSessions = useMemo(() => {
    let filtered = [...allSessionsData];

    // Filter by grade
    if (filters.grades.length > 0) {
      filtered = filtered.filter((session) =>
        filters.grades.includes(session.grade)
      );
    }

    // Filter by tries
    if (filters.tries.length > 0) {
      filtered = filtered.filter((session) =>
        filters.tries.some((filterTries) =>
          matchesTries(session.tries, filterTries)
        )
      );
    }

    // Filter by stars
    if (filters.stars.length > 0) {
      filtered = filtered.filter((session) =>
        filters.stars.includes(session.stars)
      );
    }

    return filtered;
  }, [allSessionsData, filters]);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleDayPress = (index: number) => {
    // TODO: Implement day selection functionality
  };

  const handleSessionPress = (index: number) => {
    // Navigate to individual climb page
    const climbId = climbs[index]?.id;
    if (climbId) {
      router.push(`/individual-climb-page?id=${climbId}`);
    }
  };

  const handleAnalyticsPress = () => {
    router.push("/analytics");
  };

  // Loading state
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: "#8E8E93" }}>Loading logs...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", padding: 20 },
        ]}
      >
        <Text style={{ color: "#FF3B30", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <HomeHeader streakCount={2} onFilterPress={handleFilterPress} />
        <PointsDisplay points={104} subtitle="This week" />
        <DaySelector days={days} onDayPress={handleDayPress} />
        {filteredSessions.length === 0 ? (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text
              style={{ color: "#8E8E93", fontSize: 16, textAlign: "center" }}
            >
              No climb logs yet.{"\n"}
              Start logging your climbs!
            </Text>
          </View>
        ) : (
          <RecentSessions
            sessions={filteredSessions}
            onSessionPress={handleSessionPress}
          />
        )}
        <AnalyticsPreview onPress={handleAnalyticsPress} />
      </View>
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </>
  );
};

export default Index;
