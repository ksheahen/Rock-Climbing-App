import { router } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { AnalyticsPreview } from "../(components)/analyticspreview";
import { DayData, DaySelector } from "../(components)/dayselector";
import { HomeHeader } from "../(components)/homeheader";
import { PointsDisplay } from "../(components)/pointsdisplay";
import { RecentSessions } from "../(components)/recentsessions";
import { SessionData } from "../(components)/sessioncard";
import { styles } from "../styles/index";

const index = () => {
  const days: DayData[] = [
    { day: "S", date: "20", status: "red" },
    { day: "S", date: "21", status: "green" },
    { day: "M", date: "22", status: "green" },
    { day: "T", date: "23", status: "selected" },
    { day: "W", date: "24", status: "default" },
    { day: "T", date: "25", status: "default" },
    { day: "F", date: "26", status: "default" },
  ];

  const sessions: SessionData[] = [
    { grade: "V10", tries: "3 Tries", stars: 2, date: "9/22/25" },
    { grade: "V8", tries: "10+ Tries", stars: 3, date: "9/22/25" },
    { grade: "V7", tries: "5 Tries", stars: 2, date: "9/21/25" },
  ];

  const handleFilterPress = () => {
    // TODO: Implement filter functionality
    console.log("Filter pressed");
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeHeader streakCount={2} onFilterPress={handleFilterPress} />
      <PointsDisplay points={104} subtitle="This week" />
      <DaySelector days={days} onDayPress={handleDayPress} />
      <RecentSessions sessions={sessions} onSessionPress={handleSessionPress} />
      <AnalyticsPreview onPress={handleAnalyticsPress} />
    </ScrollView>
  );
};

export default index;
