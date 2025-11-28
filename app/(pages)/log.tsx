import Attempt from "@/components/Attempt/Attempt";
import Category from "@/components/Category/Category";
import Complete from "@/components/Complete/Complete";
import DateTime from "@/components/DateTime/DateTime";
import Description from "@/components/Description/Description";
import Difficulty from "@/components/Difficulty/Difficulty";
import Header from "@/components/Header/Header";
import Line from "@/components/Line/Line";
import Media from "@/components/Media/Media";
import Rating from "@/components/Rating/Rating";
import Type from "@/components/Type/Type";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/log.styles";

function LogAscent() {
  const db = useSQLiteContext();
  // local storage
  const [selectedCategory, setSelectedCategory] = useState("Indoor");
  const [selectedType, setSelectedType] = useState("Boulder");
  const [selectedComplete, setSelectedComplete] = useState("Yes");
  const [selectedAttempt, setSelectedAttempt] = useState("1");
  const [selectedGrade, setSelectedGrade] = useState("4a/V0");
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedMedia, setSelectedMedia] = useState("");
  const editToggle = true;
  const router = useRouter();

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

  // SEND -------------
  const handleSubmit = async () => {
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

    // Insert into existing log_climb3 table
    await db.runAsync(
      `INSERT INTO log_climb3 (category, type, complete, attempt, grade, rating, datetime, description, media) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      ],
    );

    console.log("Climb saved to database");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        leftText="Cancel"
        rightText="Save"
        onLeftPress={() => console.log("Cancel pressed")}
        onRightPress={handleSubmit}
      />

      {/* Scrollable Inputs */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Log Ascent</Text>
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
        <DateTime editToggle={editToggle} />
        <Line />
        <Description />
        <Line />
        <Media />
      </ScrollView>
    </View>
  );
}

export default LogAscent;
