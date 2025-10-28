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
    </ScrollView>
  );
}

export default IndividualClimbPage;
