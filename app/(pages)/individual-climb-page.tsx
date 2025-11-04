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
import { useFocusEffect } from "@react-navigation/native";
import { useSearchParams } from "expo-router/build/hooks";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import styles from "../styles/individual-climb-page.styles";

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

  // get the id from params of the request
  const searchParams = useSearchParams();
  const paramsid = searchParams.get("id");
  console.log("Request Id      - ", paramsid);

  // LOAD -------------
  const loadClimbs = async () => {
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
  };

  // Trigger loadClimbs whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadClimbs();
    }, [paramsid]),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leftright_container}>
        <View style={styles.left}>
          <BackButton />
        </View>
        <View style={styles.right}>
          <SettingsButton />
        </View>
      </View>
      <View style={styles.media}></View>
      <Category
        selectedProp={selectedCategory}
        onSelectedChange={setSelectedCategory}
      />
      <Line />
      <Type selectedProp={selectedType} onSelectedChange={setSelectedType} />
      <Line />
      <Complete
        selectedProp={selectedComplete}
        onSelectedChange={setSelectedComplete}
      />
      <Line />
      <Attempt
        selectedProp={selectedAttempt}
        onSelectedChange={setSelectedAttempt}
      />
      <Line />
      <Difficulty
        selectedProp={selectedGrade}
        onSelectedChange={setSelectedGrade}
      />
      <Line />
      <Rating
        selectedProp={selectedRating}
        onSelectedChange={setSelectedRating}
      />
      <Line />
      {/* TODO */}
      <DateTime />
      <Line />
      {/* TODO */}
      <Description />
    </ScrollView>
  );
}

export default IndividualClimbPage;
