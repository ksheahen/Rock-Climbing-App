import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/recentsessions";
import { SessionCard, SessionData } from "./sessioncard";

interface RecentSessionsProps {
  sessions: SessionData[];
  onSessionPress?: (index: number) => void;
}

export const RecentSessions: React.FC<RecentSessionsProps> = ({
  sessions,
  onSessionPress,
}) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>RECENT SESSIONS</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.sessionsScroll}
      >
        {sessions.map((session, index) => (
          <SessionCard
            key={index}
            session={session}
            onPress={() => onSessionPress?.(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
