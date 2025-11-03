import { router } from "expo-router";
import React, { useMemo, useState } from "react";
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
import { styles } from "./index.styles";

const Index = () => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    grades: [],
    tries: [],
    stars: [],
    dateRange: "all",
  });

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
