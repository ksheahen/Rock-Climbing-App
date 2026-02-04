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

// Extract V-grade number from grade string (e.g., "6a/V3" -> 3)
const getVGradePoints = (grade: string): number => {
  if (!grade) return 0;
  const match = grade.match(/V(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
};

// Check if a date is within the current week (Sunday to Saturday)
const isWithinCurrentWeek = (dateString: string): boolean => {
  if (!dateString) return false;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return false;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // Next Sunday

    return date >= startOfWeek && date < endOfWeek;
  } catch {
    return false;
  }
};

// Check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Get the start of the current week (Sunday)
const getStartOfWeek = (): Date => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
};

const DAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];

// Check if a climb's datetime matches a specific date (using same logic as day selector)
const climbMatchesDate = (climb: LocalClimb, targetDate: Date): boolean => {
  if (!climb.datetime) return false;
  try {
    const climbDate = new Date(climb.datetime);
    if (isNaN(climbDate.getTime())) return false;
    return isSameDay(climbDate, targetDate);
  } catch {
    return false;
  }
};

// Check if any climb exists on a specific date
const hasClimbOnDate = (climbs: LocalClimb[], targetDate: Date): boolean => {
  return climbs.some((climb) => climbMatchesDate(climb, targetDate));
};

// Calculate climbing streak (consecutive days with climbs)
const calculateStreak = (climbs: LocalClimb[]): number => {
  if (climbs.length === 0) return 0;

  // Start from today and count backwards
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let currentDate = new Date(today);

  // Check if today has a climb, if not start from yesterday
  if (!hasClimbOnDate(climbs, currentDate)) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Count consecutive days with climbs
  while (hasClimbOnDate(climbs, currentDate)) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
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

  // Calculate weekly V Points from climbs
  const weeklyVPoints = useMemo(() => {
    return climbs
      .filter((climb) => isWithinCurrentWeek(climb.datetime))
      .reduce((total, climb) => total + getVGradePoints(climb.grade), 0);
  }, [climbs]);

  // Calculate climbing streak
  const streakCount = useMemo(() => calculateStreak(climbs), [climbs]);

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

  // Generate dynamic week days with status based on climbs
  const days: DayData[] = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = getStartOfWeek();

    return DAY_LETTERS.map((dayLetter, index) => {
      // Calculate the date for this day of the week
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);

      // Check if this day is today
      const isToday = isSameDay(dayDate, today);

      // Check if this day is in the future
      const isFuture = dayDate > today;

      // Check if any climbs exist on this day (using shared helper)
      const hasClimbs = hasClimbOnDate(climbs, dayDate);

      // Determine status
      let status: DayData["status"];
      if (isToday) {
        status = "selected";
      } else if (isFuture) {
        status = "default";
      } else {
        // Past day: green if has climbs, red if no climbs
        status = hasClimbs ? "green" : "red";
      }

      return {
        day: dayLetter,
        date: dayDate.getDate().toString(),
        status,
      };
    });
  }, [climbs]);

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
        <HomeHeader
          streakCount={streakCount}
          onFilterPress={handleFilterPress}
        />
        <PointsDisplay points={weeklyVPoints} subtitle="This week" />
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
