import React from "react";
import { Dimensions, Text, View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import styles from "./StatCard.styles";

interface StatCardsProps {
  climbsCount?: number;
  climbsGoal?: number;
  highestGrade?: string | number;
  highestGradeMax?: number;
}

// Also currently a WIP - data/calculations are just place holders for now
function StatCard({
  climbsCount = 0,
  climbsGoal = 100,
  highestGrade = "V0",
  highestGradeMax = 12,
}: StatCardsProps) {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 60) / 2;

  // Calculates the percentage of climbs completed compared to the goal (default = 100)
  const climbPercentage =
    climbsGoal > 0 ? Math.min(1, climbsCount / climbsGoal) : 0;

  // Compute the highest grade numerically
  let gradeValue = 0;
  if (typeof highestGrade === "number") {
    gradeValue = highestGrade;
  } else if (typeof highestGrade === "string") {
    // try to parse boulder grade like "V8"
    const vMatch = highestGrade.match(/^V(\d{1,2})$/i);
    if (vMatch) gradeValue = Number(vMatch[1]);
    else {
      // fallback: try to parse leading number (e.g., "5.12a" -> 5.12)
      const num = parseFloat(highestGrade);
      gradeValue = isNaN(num) ? 0 : num;
    }
  }

  // Calculates the grade percentage
  const gradePercentage =
    highestGradeMax > 0 ? Math.min(1, gradeValue / highestGradeMax) : 0;

  // Chart configuration
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
    strokeWidth: 8,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={[styles.card, { width: cardWidth }]}>
          <ProgressChart
            data={{ labels: ["Climbs"], data: [climbPercentage] }}
            width={cardWidth - 24}
            height={cardWidth - 24}
            strokeWidth={12}
            radius={(cardWidth - 50) / 2}
            chartConfig={chartConfig}
            hideLegend
          />
          <Text style={styles.valueText}>{climbsCount}</Text>
          <Text style={styles.labelText}>Climbs Logged</Text>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <ProgressChart
            data={{ labels: ["Grade"], data: [gradePercentage] }}
            width={cardWidth - 24}
            height={cardWidth - 24}
            strokeWidth={12}
            radius={(cardWidth - 50) / 2}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(245,166,35, ${opacity})`,
            }}
            hideLegend
          />
          <Text style={styles.valueText}>{String(highestGrade)}</Text>
          <Text style={styles.labelText}>Average Grade</Text>
        </View>
      </View>
    </View>
  );
}
export default StatCard;
