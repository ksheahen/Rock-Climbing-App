import global from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import styles from "./StatCard.styles";

interface StatCardsProps {
  climbsCount?: number;
  climbsGoal?: number;
  highestGrade?: string | number;
  highestGradeMax?: number;
  climbs?: { id?: string; grade?: string }[];
}

function StatCard({
  climbsCount = 0,
  climbsGoal = 100,
  highestGrade = "V0",
  highestGradeMax = 12,
  climbs = [],
}: StatCardsProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2;

  // Total logged climbs
  const totalClimbsLogged = Array.isArray(climbs) ? climbs.length : climbsCount;

  // Calculates the percentage of climbs completed compared to the goal (default = 100)
  const climbPercentage =
    climbsGoal > 0 ? Math.min(1, totalClimbsLogged / climbsGoal) : 0;

  // TODO: Add parsing of grades and calculate either highest or average. Right now it is just displaying the most recent grade from that last recorded climb.
  let gradeValue = 0;
  const latestGrade =
    Array.isArray(climbs) && climbs.length > 0 ? climbs[0].grade : highestGrade;

  // Calculates the grade percentage
  const gradePercentage =
    highestGradeMax > 0 ? Math.min(1, gradeValue / highestGradeMax) : 0;

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: global.colors.background_1,
    backgroundGradientTo: global.colors.background_1,
    color: (opacity = 1) => `rgba(90, 153, 228, ${opacity})`,
    strokeWidth: 8,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.iconContainer}>
            <ProgressChart
              data={{ labels: ["Climbs"], data: [climbPercentage] }}
              width={cardWidth - 24}
              height={cardWidth - 24}
              strokeWidth={12}
              radius={(cardWidth - 50) / 2}
              chartConfig={chartConfig}
              hideLegend
            />
            <Ionicons name="body-outline" size={32} style={styles.icon} />
          </View>
          <Text style={styles.valueText}>{totalClimbsLogged}</Text>
          <Text style={styles.labelText}>Climbs Logged</Text>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <View style={styles.iconContainer}>
            <ProgressChart
              data={{ labels: ["Grade"], data: [gradePercentage] }}
              width={cardWidth - 24}
              height={cardWidth - 24}
              strokeWidth={12}
              radius={(cardWidth - 50) / 2}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(255,204, 2, ${opacity})`,
              }}
              hideLegend
            />
            <Ionicons name="analytics-outline" size={32} style={styles.icon} />
          </View>
          {/* <Text style={styles.valueText}>{String(highestGrade)}</Text> */}
          <Text style={styles.valueText}>{latestGrade}</Text>
          <Text style={styles.labelText}>Latest Grade</Text>
        </View>
      </View>
    </View>
  );
}
export default StatCard;
