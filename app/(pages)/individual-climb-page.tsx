import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
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
  const [selectedCategory, setSelectedCategory] = useState("Indoor"); //default

  // type checking
  interface CategoryChangeHandler {
    (newCategory: string): void;
  }

  // logs the category passed in params to console
  const handleCategoryChange: CategoryChangeHandler = (newCategory) => {
    console.log("Category (parent):", newCategory);
    setSelectedCategory(newCategory);
  };

  //ticket to interact with sql database
  const db = useSQLiteContext();

  // use state for our climb
  const [climb, setClimb] = useState({
    category: "",
  });

  // logic to update the database
  const handleSubmit = async () => {
    try {
      await db.runAsync(
        `
                INSERT INTO log_climb2 (category) VALUES (?)`,
        [climb.category],
      );

      Alert.alert("Success", "Climb added succesfully");
      setClimb({
        category: "",
      });
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error instanceof Error
          ? error.message
          : "an error happened when inserting user into db.",
      );
    }
  };

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
        onSelectedCategoryChange={handleCategoryChange}
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
      <Button title="Add User" onPress={handleSubmit} />
    </ScrollView>
  );
}

export default IndividualClimbPage;
