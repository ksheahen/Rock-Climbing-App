import { router, useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView } from "react-native";
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
import styles from "../styles/index.styles";
type LocalClimb = {
  id: number;
  uuid?: string;
  category: string;
  type: string;
  complete: string;
  attempt: string;
  grade: string;
  rating: number | null;
  datetime: string | null;
  description: string | null;
  media: string | null;
  deleted?: number;
  synced?: number;
};

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

      // Query all climbs from log_climb3 table, ordered by id descending (most recent first)
      const result = await db.getAllAsync<LocalClimb>(
        `SELECT * FROM log_climb3 ORDER BY id DESC LIMIT 50`,
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
            const firstImage = parsed.find((m) => m.type === "image") || parsed[0];
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
    // All sessions data
    const allSessions: SessionData[] = [
      { grade: "V10", tries: "3 Tries", stars: 2, date: "9/22/25" },
      { grade: "V8", tries: "10+ Tries", stars: 3, date: "9/22/25" },
      { grade: "V7", tries: "5 Tries", stars: 2, date: "9/21/25" },
    ];

    let filtered = [...allSessions];

    // Filter by grade
    if (filters.grades.length > 0) {
      filtered = filtered.filter((session) =>
        filters.grades.includes(session.grade),
      );
    }

    // Filter by tries
    if (filters.tries.length > 0) {
      filtered = filtered.filter((session) =>
        filters.tries.some((filterTries) =>
          matchesTries(session.tries, filterTries),
        ),
      );
    }

    // Filter by stars
    if (filters.stars.length > 0) {
      filtered = filtered.filter((session) =>
        filters.stars.includes(session.stars),
      );
    }

    // Note: Date range filtering would require actual date objects
    // For now, we're using the mock date strings
    // In a real app, you'd compare actual dates here

    return filtered;
  }, [filters]);

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleDayPress = (index: number) => {
    // TODO: Implement day selection functionality
    console.log("Day pressed:", index);
  };

  const handleSessionPress = (index: number) => {
    // TODO: Navigate to session detail page
    console.log("Session pressed:", index);
  };

  const handleAnalyticsPress = () => {
    router.push("/analytics");
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader streakCount={2} onFilterPress={handleFilterPress} />
        <PointsDisplay points={104} subtitle="This week" />
        <DaySelector days={days} onDayPress={handleDayPress} />
        <RecentSessions
          sessions={filteredSessions}
          onSessionPress={handleSessionPress}
        />
        <AnalyticsPreview onPress={handleAnalyticsPress} />
      </ScrollView>

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
