import Attempt from "@/components/Attempt/Attempt";
import BackButton from "@/components/BackButton/BackButton";
import Category from "@/components/Category/Category";
import Complete from "@/components/Complete/Complete";
import DateTime from "@/components/DateTime/DateTime";
import Description from "@/components/Description/Description";
import Difficulty from "@/components/Difficulty/Difficulty";
import Line from "@/components/Line/Line";
import Rating from "@/components/Rating/Rating";
import SettingsButton from "@/components/SettingsButton/SettingsButton";
import Type from "@/components/Type/Type";
import Media from "@/components/Media/Media";

import { useFocusEffect } from "@react-navigation/native";
import { useSearchParams, useRouter } from "expo-router/build/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState, useMemo } from "react";
import {
  ScrollView,
  View,
  Modal,
  Text,
  Pressable,
  Image,
} from "react-native";
import styles from "../styles/individual-climb-page.styles";
import Icon from "react-native-remix-icon";
import { ResizeMode, Video } from "expo-av";

// ---- media helpers ----
type MediaItem = { uri: string; type: "image" | "video" };

function parseMediaItems(raw: string): MediaItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (it) =>
        it &&
        typeof it.uri === "string" &&
        (it.type === "image" || it.type === "video"),
    );
  } catch {
    return [];
  }
}

// TODO: Make it so that this page
// can also update the values in
// the database using a save button
// also they should be able to delete
// a log

function IndividualClimbPage() {
  const db = useSQLiteContext();
  // default values (local storage)
  const [selectedCategory, setSelectedCategory] = useState("Indoor");
  const [selectedType, setSelectedType] = useState("Boulder");
  const [selectedComplete, setSelectedComplete] = useState("Yes");
  const [selectedAttempt, setSelectedAttempt] = useState("1");
  const [selectedGrade, setSelectedGrade] = useState("4a/V0");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const [editToggle, setEditToggle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log("----------------------------");
  console.log("Local Storage 'category'  -", selectedCategory);
  console.log("Local Storage 'type'      -", selectedType);
  console.log("Local Storage 'complete'  -", selectedComplete);
  console.log("Local Storage 'attempt'   -", selectedAttempt);
  console.log("Local Storage 'grade'     -", selectedGrade);
  console.log("Local Storage 'rating'    -", selectedRating);
  console.log("Local Storage 'datetime'  -", selectedDateTime);
  console.log("Local Storage 'desc'      -", selectedDescription);
  console.log("Local Storage 'media'     -", selectedMedia);
  console.log("----------------------------");

  // derive media items from stored JSON string
  const mediaItems = useMemo(
    () => parseMediaItems(selectedMedia),
    [selectedMedia],
  );

  // get the id from params of the request
  const searchParams = useSearchParams();
  const paramsid = searchParams.get("id");
  console.log("Request Id      - ", paramsid);

  // LOAD -------------
  const loadClimbs = async () => {
    try {
      if (paramsid != null) {
        const result = await db.getAllAsync(
          `SELECT * FROM log_climb3 WHERE id = ?`,
          [paramsid],
        );
        if (result.length > 0) {
          const climbData = result[0] as {
            category: string;
            type: string;
            complete: string;
            attempt: string;
            grade: string;
            rating: number;
            datetime: string;
            description: string;
            media: string;
          };
          // update local state with db values
          setSelectedCategory(climbData.category);
          setSelectedType(climbData.type);
          setSelectedComplete(climbData.complete);
          setSelectedAttempt(climbData.attempt);
          setSelectedGrade(climbData.grade);
          setSelectedRating(climbData.rating);
          setSelectedDateTime(climbData.datetime);
          setSelectedDescription(climbData.description);
          setSelectedMedia(climbData.media);
        }
      }
    } catch (error: any) {
      // TODO : Add a modal pop up for error
      console.error("Failed to load logs:", error);
    }
  };

  // SEND -------------
  const handleSubmit = async () => {
    try {
      const climb = {
        category: selectedCategory,
        type: selectedType,
        complete: selectedComplete,
        attempt: selectedAttempt,
        grade: selectedGrade,
        rating: selectedRating,
        datetime: selectedDateTime,
        description: selectedDescription,
        media: selectedMedia,
      };
      // check
      console.log("DB Storage 'category'   -", climb.category);
      console.log("DB Storage 'type'       - ", climb.type);
      console.log("DB Storage 'complete'   - ", climb.complete);
      console.log("DB Storage 'attempt'    - ", climb.attempt);
      console.log("DB Storage 'grade'      - ", climb.grade);
      console.log("DB Storage 'rating'     - ", climb.rating);
      console.log("DB Storage 'datetime'   - ", climb.datetime);
      console.log("DB Storage 'desc'       - ", climb.description);
      console.log("DB Storage 'media'      - ", climb.media);

      // update the db
      const result = await db.runAsync(
        `UPDATE log_climb3 
         SET category = ?, type = ?, complete = ?, attempt = ?, grade = ?, rating = ?, datetime = ?, description = ?, media = ?
         WHERE id = ?`,
        [
          climb.category,
          climb.type,
          climb.complete,
          climb.attempt,
          climb.grade,
          climb.rating,
          climb.datetime,
          climb.description,
          climb.media,
          paramsid,
        ],
      );

      console.log("Updating logs in db", result);
      setEditToggle(false);
    } catch (error: any) {
      // TODO : Add a modal pop up for error
      console.error("Failed to update logs:", error);
    }
  };

  // trigger loadClimbs whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      // on focus, load climb data
      loadClimbs();

      // on unfocus, reset editToggle
      return () => {
        setEditToggle(false);
      };
    }, [paramsid]),
  );

  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/profile`);
  };

  const editPress = async () => {
    console.log("edit pressed");
    setModalVisible(false);
    setEditToggle(true);
  };

  const deletePress = async () => {
    try {
      const result = await db.runAsync(`DELETE FROM log_climb3 WHERE id = ?`, [
        paramsid,
      ]);
      console.log(`Deleted log ${paramsid} from db`, result);
      setModalVisible(false); // this doesnt really matter
      handleRedirect();
    } catch (error: any) {
      // TODO : Add a modal pop up for error
      console.error("Failed to delete log:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftright_container}>
        <View style={styles.left}>
          <BackButton />
        </View>
        <View style={styles.right}>
          <SettingsButton
            modalVisibleProp={modalVisible}
            onSelectedChange={setModalVisible}
          />
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll_container}
      >
<View style={styles.media}>
  {mediaItems.length === 0 ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Icon name="image-line" size={32} color="#8E8E93" />
      <Text style={{ marginTop: 8, color: "#8E8E93" }}>No media</Text>
    </View>
  ) : (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
    >
      {mediaItems.map((m) => (
        <View key={m.uri} style={styles.mediaItem}>
          {m.type === "image" ? (
            <Image
              source={{ uri: m.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : (
            <Video
              source={{ uri: m.uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode={ResizeMode.COVER}
              shouldPlay={false}
              isMuted
              useNativeControls
            />
          )}
        </View>
      ))}
    </ScrollView>
  )}
</View>
        <Category
          selectedProp={selectedCategory}
          onSelectedChange={setSelectedCategory}
          editToggle={editToggle}
        />
        <Line />
        <Type
          selectedProp={selectedType}
          onSelectedChange={setSelectedType}
          editToggle={editToggle}
        />
        <Line />
        <Complete
          selectedProp={selectedComplete}
          onSelectedChange={setSelectedComplete}
          editToggle={editToggle}
        />
        <Line />
        <Attempt
          selectedProp={selectedAttempt}
          onSelectedChange={setSelectedAttempt}
          editToggle={editToggle}
        />
        <Line />
        <Difficulty
          selectedProp={selectedGrade}
          onSelectedChange={setSelectedGrade}
          editToggle={editToggle}
        />
        <Line />
        <Rating
          selectedProp={selectedRating}
          onSelectedChange={setSelectedRating}
          editToggle={editToggle}
        />
        <Line />
        <DateTime
          selectedProp={selectedDateTime}
          onSelectedChange={setSelectedDateTime}
          editToggle={editToggle}
        />
        <Line />
        <Description
          selectedProp={selectedDescription}
          onSelectedChange={setSelectedDescription}
          editToggle={editToggle}
        />
        {/* Media editor + Save button only in edit mode */}
        {editToggle && (
          <>
            <Line />
            <Media
              selectedProp={selectedMedia}
              onSelectedChange={setSelectedMedia}
              editToggle={editToggle}
            />
            <View style={styles.save_container}>
              <Pressable onPress={handleSubmit} style={styles.save_button}>
                <Text style={styles.save_text}>Save</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
      {/* modal is visible only when modalVisible = true */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        {/* overlay */}
        <Pressable
          style={styles.modal_outter_container}
          onPress={() => setModalVisible(false)}
        ></Pressable>
        {/* modal */}
        <View style={styles.modal_inner_container}>
          <Pressable style={styles.modal_button} onPress={() => editPress()}>
            <Text style={styles.modal_text}>Edit Climb</Text>
          </Pressable>
          <Pressable style={styles.modal_button} onPress={() => deletePress()}>
            <Text style={styles.modal_text}>Delete Climb</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

export default IndividualClimbPage;
