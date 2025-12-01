import { global } from "@/theme";
import { LocalClimb } from "@/types/LocalClimb";
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
  climbs?: LocalClimb[];
}

function StatCard({
  climbsCount = 0,
  climbsGoal = 100,
  highestGrade = "V0",
  highestGradeMax = 12,
  climbs = [] as LocalClimb[],
}: StatCardsProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2;

  // Total logged climbs
  const totalClimbsLogged = Array.isArray(climbs) ? climbs.length : climbsCount;

  // Calculates the percentage of climbs completed compared to the goal (default = 100)
  const climbPercentage =
    climbsGoal > 0 ? Math.min(1, totalClimbsLogged / climbsGoal) : 0;

  // Parser to convert grade to a numeric value
  const parseGrade = (g: string | number | undefined): number => {
    if (typeof g === "number") return g;
    if (!g) return 0;
    const s = String(g).trim();
    const vMatch = /^V\s*([-+]?\d+)/i.exec(s);
    if (vMatch) return parseInt(vMatch[1], 10) || 0;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  // Update latest grade's state
  const latestGradeState =
    Array.isArray(climbs) && climbs.length > 0 ? climbs[0].grade : highestGrade;
  const gradeValueState = parseGrade(latestGradeState);
  // Calculates the grade percentage
  const gradePercentage =
    highestGradeMax > 0 ? Math.min(1, gradeValueState / highestGradeMax) : 0;

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
          <Text style={styles.valueText}>{latestGradeState}</Text>
          <Text style={styles.labelText}>Latest Grade</Text>
        </View>
      </View>
    </View>
  );
}
export default StatCard;
