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
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderComponent 
        leftText="Cancel" 
        rightText="Save" 
        onLeftPress={() => console.log("Cancel pressed")} 
        onRightPress={() => console.log("Save pressed")} 
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

        <CategoryComponent />
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
