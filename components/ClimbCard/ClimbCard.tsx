import { ResizeMode, Video } from "expo-av";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Icon from "react-native-remix-icon";
import { styles } from "./ClimbCard.styles";

export interface ClimbData {
  id: number;
  category: string;
  type: string;
  complete: string;
  attempt: string;
  grade: string;
  rating: number;
  datetime: string;
  description: string;
  media: string;
}

export interface ClimbCardProps {
  climb: ClimbData;
  onPress?: () => void;
  onDelete?: () => void;
}

export const ClimbCard: React.FC<ClimbCardProps> = ({
  climb,
  onPress,
  onDelete,
}) => {
  const parseMediaItems = (raw: string) => {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (it: any) =>
          it && typeof it.uri === "string" && (it.type === "image" || it.type === "video")
      );
    } catch {
      return [];
    }
  };

  const mediaItems = parseMediaItems(climb.media);

  const renderRightActions = () => (
    <Pressable
      onPress={onDelete}
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        marginVertical: 8,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
    </Pressable>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Pressable style={styles.cardContainer} onPress={onPress}>
        <View style={styles.media}>
          {mediaItems.length === 0 ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Icon name="image-line" size={32} color="#8E8E93" />
            </View>
          ) : (
            mediaItems.map((m: any) =>
              m.type === "image" ? (
                <Image key={m.uri} source={{ uri: m.uri }} style={styles.mediaItem} />
              ) : (
                <Video
                  key={m.uri}
                  source={{ uri: m.uri }}
                  style={styles.mediaItem}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false}
                  isMuted
                  useNativeControls
                />
              )
            )
          )}
        </View>
        <View style={styles.info}>
          <Text style={styles.grade}>{climb.grade}</Text>
          <Text>{climb.attempt} tries</Text>
          <Text>{climb.datetime}</Text>
          <Text>{climb.rating} Stars</Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};
