import { global } from "@/theme";
import { LocalClimb } from "@/types/LocalClimb";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
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
  const [cardWidth, setCardWidth] = useState(0);

  const onCardLayout = (e: LayoutChangeEvent) => {
    setCardWidth(e.nativeEvent.layout.width);
  };

  const totalClimbsLogged = Array.isArray(climbs) ? climbs.length : climbsCount;

  const climbPercentage =
    climbsGoal > 0 ? Math.min(1, totalClimbsLogged / climbsGoal) : 0;

  const parseGrade = (g: string | number | undefined): number => {
    if (typeof g === "number") return g;
    if (!g) return 0;
    const s = String(g).trim();
    const vMatch = /^V\s*([-+]?\d+)/i.exec(s);
    if (vMatch) return parseInt(vMatch[1], 10) || 0;
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  const latestGradeState =
    Array.isArray(climbs) && climbs.length > 0 ? climbs[0].grade : highestGrade;
  const gradeValueState = parseGrade(latestGradeState);
  const gradePercentage =
    highestGradeMax > 0 ? Math.min(1, gradeValueState / highestGradeMax) : 0;

  const chartSize = cardWidth > 0 ? cardWidth - 24 : 120;
  const chartRadius = cardWidth > 0 ? (cardWidth - 50) / 2 : 45;

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
        <View style={styles.card} onLayout={onCardLayout}>
          {cardWidth > 0 && (
            <>
              <View style={styles.iconContainer}>
                <ProgressChart
                  data={{ labels: ["Climbs"], data: [climbPercentage] }}
                  width={chartSize}
                  height={chartSize}
                  strokeWidth={12}
                  radius={chartRadius}
                  chartConfig={chartConfig}
                  hideLegend
                />
                <Ionicons name="body-outline" size={32} style={styles.icon} />
              </View>
              <Text style={styles.valueText}>{totalClimbsLogged}</Text>
              <Text style={styles.labelText}>Climbs Logged</Text>
            </>
          )}
        </View>

        <View style={styles.card}>
          {cardWidth > 0 && (
            <>
              <View style={styles.iconContainer}>
                <ProgressChart
                  data={{ labels: ["Grade"], data: [gradePercentage] }}
                  width={chartSize}
                  height={chartSize}
                  strokeWidth={12}
                  radius={chartRadius}
                  chartConfig={{
                    ...chartConfig,
                    color: (opacity = 1) => `rgba(255,204, 2, ${opacity})`,
                  }}
                  hideLegend
                />
                <Ionicons
                  name="analytics-outline"
                  size={32}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.valueText}>{latestGradeState}</Text>
              <Text style={styles.labelText}>Latest Grade</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
export default StatCard;
