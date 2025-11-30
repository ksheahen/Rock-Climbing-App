import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./LineCharts.styles";

// Place holder data for right now
function LineCharts() {
  const screenWidth = Dimensions.get("window").width - 40;
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [3.2, 3.6, 4.0, 4.3, 4.8, 5.1],
        color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.chartSection}>
      <LineChart
        data={lineData}
        width={screenWidth}
        height={200}
        yAxisSuffix=""
        chartConfig={{
          backgroundGradientFrom: "#ffffffff",
          backgroundGradientTo: "#ffffffff",
          color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
          labelColor: () => "#8E8E93",
          propsForDots: { r: "3", strokeWidth: "1", stroke: "#fff" },
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}

export default LineCharts;
