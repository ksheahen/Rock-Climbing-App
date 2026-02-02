import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../theme";
import { styles } from "./SessionCard.styles";

export interface SessionData {
  grade: string;
  tries: string;
  stars: number;
  date: string;
  imageUri?: string | null;
}

export interface SessionCardProps {
  session: SessionData;
  onPress?: () => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onPress,
}) => {
  const renderStars = (count: number) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Ionicons
        key={i}
        name="star"
        size={12}
        color={i < count ? COLORS.starYellow : COLORS.lightGray}
      />
    ));
  };

  return (
    <TouchableOpacity style={styles.sessionCard} onPress={onPress}>
      {session.imageUri ? (
        <Image
          source={{ uri: session.imageUri }}
          style={styles.sessionImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.sessionImagePlaceholder} />
      )}
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionGrade}>{session.grade}</Text>
        <Text style={styles.sessionTries}>{session.tries}</Text>
        <View style={styles.sessionBottom}>
          <View style={styles.starsContainer}>
            {renderStars(session.stars)}
          </View>
          <Text style={styles.sessionDate}>{session.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
