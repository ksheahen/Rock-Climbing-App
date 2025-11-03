import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SessionCard, SessionData } from "../SessionCard/SessionCard";
import { styles } from "./RecentSessions.styles";

export interface RecentSessionsProps {
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

