import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./Media.styles";

type MediaItem = { uri: string; type: "image" | "video" };

export function Media({
  maxItems = 5,
  onChange,
}: {
  maxItems?: number;
  onChange?: (items: MediaItem[]) => void;
}) {
  const [items, setItems] = useState<MediaItem[]>([]);

  const updateItems = (next: MediaItem[]) => {
    setItems(next);
    onChange?.(next);
  };

  const askForPermissions = async (kind: "camera" | "library") => {
    const f =
      kind === "camera"
        ? ImagePicker.requestCameraPermissionsAsync
        : ImagePicker.requestMediaLibraryPermissionsAsync;
    const { status } = await f();
    return status === "granted";
  };

  const pickFromLibrary = async () => {
    const ok = await askForPermissions("library");
    if (!ok)
      return Alert.alert("Permission needed", "Enable photo library access.");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: Math.max(1, maxItems - items.length),
      quality: 0.8,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    });
    if (result.canceled) return;

    const chosen = result.assets.map<MediaItem>((a) => ({
      uri: a.uri,
      type: a.type === "video" ? "video" : "image",
    }));
    updateItems([...items, ...chosen].slice(0, maxItems));
  };

  const captureWithCamera = async () => {
    const ok = await askForPermissions("camera");
    if (!ok) return Alert.alert("Permission needed", "Enable camera access.");

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.8,
      videoMaxDuration: 30,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    });
    if (result.canceled) return;

    const a = result.assets[0];
    const next: MediaItem = {
      uri: a.uri,
      type: a.type === "video" ? "video" : "image",
    };
    updateItems([...items, next].slice(0, maxItems));
  };

  const handleAdd = () => {
    Alert.alert("Add media", "Choose a source", [
      { text: "Take photo/video", onPress: captureWithCamera },
      { text: "Choose from library", onPress: pickFromLibrary },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const removeAt = (idx: number) => {
    updateItems(items.filter((_, i) => i !== idx));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media</Text>

      {items.length === 0 ? (
        <Pressable style={styles.mediaBox} onPress={handleAdd} hitSlop={8}>
          <Icon name="attachment-2" size="28" color="#C7C7CC" />
          <Text style={styles.emptyText}>Add photo or video</Text>
        </Pressable>
      ) : (
        <View style={styles.mediaBox}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {items.length < maxItems && (
              <Pressable
                onPress={handleAdd}
                style={[styles.tile, styles.addTile]}
                hitSlop={8}
              >
                <Icon name="add-line" size={24} color="#8E8E93" />
                <Text style={styles.addTileText}>Add</Text>
              </Pressable>
            )}

            {items.map((m, idx) => (
              <View key={m.uri} style={styles.thumbWrap}>
                {m.type === "image" ? (
                  <Image source={{ uri: m.uri }} style={styles.tile} />
                ) : (
                  <Video
                    source={{ uri: m.uri }}
                    style={[styles.tile, styles.videoBg]}
                    resizeMode={ResizeMode.COVER}
                    shouldPlay={false}
                    isMuted
                  />
                )}

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {m.type === "image" ? "IMG" : "VID"}
                  </Text>
                </View>

                <Pressable
                  onPress={() => removeAt(idx)}
                  style={styles.removeBtn}
                  hitSlop={8}
                >
                  <Icon name="close-line" size={14} color="#fff" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
