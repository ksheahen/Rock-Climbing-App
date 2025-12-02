import { global } from "@/theme";
import { LocalClimb } from "@/types/LocalClimb";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-remix-icon";
import Line from "../Line/Line";
import styles from "./ClimbHistory.styles";

interface ClimbHistoryProps {
  climbs?: LocalClimb[];
  dates?: "day" | "week" | "month" | "all";
}

// Pass in log data to this component. If you want it filtered, filter the data before sending it through.
// This displays the individual logs grouped by date on the profile
function ClimbHistory({
  climbs = [] as LocalClimb[],
  dates = "day",
}: ClimbHistoryProps) {
  const router = useRouter();
  const handleRedirect = (id: number) => {
    router.push(`/individual-climb-page?id=${id}`);
  };

  // Helps format date and time for logs
  const formatDateTime = (iso?: string) => {
    if (!iso) return { date: "", time: "" };
    const d = new Date(iso);
    if (isNaN(d.getTime())) return { date: "", time: "" };
    return {
      date: d.toLocaleDateString(),
      time: d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Ionicons
        key={i}
        name="star"
        size={12}
        color={i < count ? global.colors.yellow : global.colors.background_2}
      />
    ));
  };

  return (
    <ScrollView style={styles.container}>
      {climbs.map((climb, index) => {
        const { date, time } = formatDateTime(climb.datetime);
        const prevClimb = index > 0 ? climbs[index - 1] : null;
        const prevDate = prevClimb
          ? formatDateTime(prevClimb.datetime).date
          : null;
        const showDate = date !== prevDate;

        return (
          <View key={climb.id}>
            {showDate && (
              <>
                <Text style={styles.date}>{date}</Text>
                <Line />
              </>
            )}
            <View style={styles.mini_container}>
              <TouchableOpacity onPress={() => handleRedirect(climb.id)}>
                <Text style={styles.time}>{time}</Text>
                <View style={styles.gradeRow}>
                  <Icon name="check-line" size="18" />
                  <Text style={styles.grade}>{climb.grade}</Text>
                  <Text style={styles.stars}> {renderStars(climb.rating)}</Text>
                </View>
                <View style={styles.tries}>
                  <Text>{climb.attempt} Tries</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default ClimbHistory;
