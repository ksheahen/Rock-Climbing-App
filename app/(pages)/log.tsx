import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AttemptComponent from "../(components)/attempt";
import CategoryComponent from "../(components)/category";
import CompleteComponent from "../(components)/complete";
import DateTimeComponent from "../(components)/datetime";
import DescriptionComponent from "../(components)/description";
import DifficultyComponent from "../(components)/difficulty";
import HeaderComponent from "../(components)/header";
import LineComponent from "../(components)/line";
import MediaComponent from "../(components)/media";
import RatingComponent from "../(components)/rating";
import TypeComponent from "../(components)/type";
import styles from "../styles/log";

function LogAscent() {
  // local storage
  const [selectedCategory, setSelectedCategory] = useState("Indoor");
  const db = useSQLiteContext();

  console.log("Local Storage 'category' -", selectedCategory);

  // SEND -------------
  const handleSubmit = async () => {
    const climb = {
      category: selectedCategory,
    };
    // check
    console.log("DB Storage 'category'=", climb.category);

    // send to db
    await db.runAsync(`INSERT INTO log_climb2 (category) VALUES (?)`, [
      climb.category,
    ]);

    console.log("Sent climb data to db...");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderComponent
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
        <CategoryComponent
          selectedCategoryProp={selectedCategory}
          onSelectedCategoryChange={setSelectedCategory}
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
        <LineComponent />
        <MediaComponent />
      </ScrollView>
    </View>
  );
}

export default LogAscent;
