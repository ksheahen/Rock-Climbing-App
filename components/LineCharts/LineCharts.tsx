import { LocalClimb } from "@/types/LocalClimb";
import React from "react";
import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import styles from "./LineCharts.styles";

interface LineChartProps {
  climbs?: LocalClimb[];
  dateRange?: "week" | "month" | "year" | "all time";
}

function LineCharts({
  climbs = [] as LocalClimb[],
  dateRange = "week",
}: LineChartProps) {
  const screenWidth = Dimensions.get("window").width - 40;
  const now = new Date();

  // Parses and verifies date
  const safeDate = (d?: string | null) => {
    if (!d) return null;
    const newDate = new Date(d);
    return isNaN(newDate.getTime()) ? null : newDate;
  };

  const startOfDay = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const daysBetween = (a: Date, b: Date) =>
    Math.floor(
      (startOfDay(a).getTime() - startOfDay(b).getTime()) /
        (1000 * 60 * 60 * 24),
    );

  let labels: string[] = [];
  let x: number[] = [];

  // If the dateRange is the current week:
  if (dateRange === "week") {
    console.log("displaying week data");
    const days = 7;
    labels = Array.from({ length: days }, (_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (days - 1 - i));
      return d.toLocaleDateString(undefined, { weekday: "short" });
    });
    x = Array.from({ length: days }, () => 0);

    climbs.forEach((c) => {
      const dt = safeDate(c.datetime);
      if (!dt) return;
      const diff = daysBetween(now, dt);
      if (diff >= 0 && diff < days) {
        const idx = days - 1 - diff;
        x[idx] += 1;
      }
    });
    // If the dateRange is the current month:
  } else if (dateRange === "month") {
    console.log("displaying month data");
    const weeks = 4;
    const totalDays = 28;
    const start = new Date(now);
    start.setDate(now.getDate() - (totalDays - 1));
    labels = Array.from({ length: weeks }, (_, i) => `Wk ${i + 1}`);
    x = Array.from({ length: weeks }, () => 0);

    climbs.forEach((c) => {
      const dt = safeDate(c.datetime);
      if (!dt) return;
      const diffFromStart = daysBetween(dt, start);
      if (diffFromStart >= 0 && diffFromStart < totalDays) {
        const idx = Math.floor(diffFromStart / 7);
        x[idx] += 1;
      }
    });
    // If the dateRange is the current year
  } else if (dateRange === "year") {
    console.log("displaying year data");
    const months = 12;
    const startMonth = new Date(
      now.getFullYear(),
      now.getMonth() - (months - 1),
      1,
    );
    labels = Array.from({ length: months }, (_, i) => {
      const m = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth() + i,
        1,
      );
      return m.toLocaleDateString(undefined, { month: "short" }); // Jan, Feb, ...
    });
    x = Array.from({ length: months }, () => 0);

    climbs.forEach((c) => {
      const dt = safeDate(c.datetime);
      if (!dt) return;
      const yearDiff = dt.getFullYear() - startMonth.getFullYear();
      const monthDiff = dt.getMonth() - startMonth.getMonth();
      const index = yearDiff * 12 + monthDiff;
      if (index >= 0 && index < months) x[index] += 1;
    });
    // If the dateRange includes all data:
  } else if (dateRange === "all time") {
    console.log("displaying all time data");

    const dates = climbs
      .map((c) => safeDate(c.datetime))
      .filter((d): d is Date => !!d);
    const minYear = dates.length
      ? Math.min(...dates.map((d) => d.getFullYear()))
      : now.getFullYear();
    const maxYear = now.getFullYear();
    const years = maxYear - minYear + 1;
    labels = Array.from({ length: years }, (_, i) => String(minYear + i));
    x = Array.from({ length: years }, () => 0);

    climbs.forEach((c) => {
      const dt = safeDate(c.datetime);
      if (!dt) return;
      const idx = dt.getFullYear() - minYear;
      if (idx >= 0 && idx < x.length) x[idx] += 1;
    });
  }

  // Map the datapoints for the graph
  const dataPoints = x.map((n) => (Number.isFinite(n) ? n : 0));

  // Calculate the min and max for the datapoints
  const minVal = dataPoints.length ? Math.min(...dataPoints) : 0;
  const maxVal = dataPoints.length ? Math.max(...dataPoints) : 0;

  // Choose graph step (either round down to 1 or up to 5)
  let yStep = Math.abs(maxVal - minVal) <= 10 ? 1 : 5;
  if (yStep <= 0) yStep = 1;

  // Round bounds to nearest step
  let minRounded = Math.floor(minVal / yStep) * yStep;
  let maxRounded = Math.ceil(maxVal / yStep) * yStep;

  // Ensures a non-zero range so chart shows multiple ticks
  if (minRounded === maxRounded) {
    minRounded = Math.max(0, minRounded - yStep);
    maxRounded = maxRounded + yStep;
  }

  // Calculate the graph segments
  const segments = Math.max(1, Math.round((maxRounded - minRounded) / yStep));

  // Plot data
  const lineData = {
    labels,
    datasets: [
      {
        data: dataPoints,
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
        height={350}
        segments={segments}
        formatYLabel={(y) => String(Math.round(Number(y)))}
        chartConfig={{
          backgroundGradientFrom: "#ffffffff",
          backgroundGradientTo: "#ffffffff",
          color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
          labelColor: () => "#8E8E93",
          propsForDots: { r: "3", strokeWidth: "1", stroke: "#fff" },
        }}
        xLabelsOffset={6}
        verticalLabelRotation={-45}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}

export default LineCharts;
