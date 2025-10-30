import { Text } from "@react-navigation/elements";
import { useFocusEffect } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import AttemptComponent from "../(components)/attempt";
import BackbtnComponent from "../(components)/backbtn";
import CategoryComponent from "../(components)/category";
import CompleteComponent from "../(components)/complete";
import DateTimeComponent from "../(components)/datetime";
import DescriptionComponent from "../(components)/description";
import DifficultyComponent from "../(components)/difficulty";
import LineComponent from "../(components)/line";
import RatingComponent from "../(components)/rating";
import SettingsbtnComponent from "../(components)/settingsbtn";
import TypeComponent from "../(components)/type";
import styles from "../styles/individual-climb-page";

function IndividualClimbPage() {
  interface HandleCategoryChange {
    (e: string): void;
  }
  const db = useSQLiteContext();
  const [selectedCategory, setSelectedCategory] = useState("Indoor"); //default

  // GET category from CategoryComponent
  const getCategoryFromChild: HandleCategoryChange = (e) => {
    console.log("Whats in the bubble category:", e);
  };

  //LOAD -------------
  const [climb2, setClimb2] = useState<any[]>([]);
  const [climb, setClimb] = useState({
    category: "",
  });

  const loadClimbs = async () => {
    // get all climbs
    // const results = await db.getAllAsync(`SELECT * FROM log_climb2`);
    // setClimb2(results);
    // console.log("LOAD - All climbs:", results);

    // get most recent climb
    const results = await db.getAllAsync(
      `SELECT * FROM log_climb2 ORDER BY id DESC LIMIT 1`,
    );
    console.log("LOAD - most recent -", results[0].category);
    setSelectedCategory(results[0].category);
    console.log("LOAD - selectedcategory -", selectedCategory);
    setClimb2(results);
  };

  // Trigger loadClimbs whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadClimbs();
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.leftright_container}>
        <View style={styles.left}>
          <BackbtnComponent />
        </View>
        <View style={styles.right}>
          <SettingsbtnComponent />
        </View>
      </View>
      <View style={styles.media}></View>
      <CategoryComponent
        selectedCategoryProp={selectedCategory}
        onSelectedCategoryChange={getCategoryFromChild}
      />
      <LineComponent />
      <TypeComponent />
      <LineComponent />
      <CompleteComponent />
      <LineComponent />
      <AttemptComponent />
      <LineComponent />
      <DifficultyComponent />
      <LineComponent />
      <RatingComponent />
      <LineComponent />
      <DateTimeComponent />
      <LineComponent />
      <DescriptionComponent />
      {/* <Button title="Add User" onPress={handleSubmit} /> */}

      {/* Render climb2 data */}
      {climb2.map((item) => (
        <View
          key={item.id}
          style={{
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <Text>{item.category}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default IndividualClimbPage;
