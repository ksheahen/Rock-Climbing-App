import { View } from "react-native";
import AttemptComponent from "../(components)/attempt";
import BackBtnComponent from "../(components)/back-btn";
import CategoryComponent from "../(components)/category";
import CompleteComponent from "../(components)/complete";
import DateTimeComponent from "../(components)/datetime";
import DescriptionComponent from "../(components)/description";
import DifficultyComponent from "../(components)/difficulty";
import LineComponent from "../(components)/line";
import RatingComponent from "../(components)/rating";
import SettingsBtnComponent from "../(components)/settings-btn";
import TypeComponent from "../(components)/type";
import styles from "../styles/individual-climb-page";

function IndividualClimbPage() {
  return (
    <View style={styles.container}>
      <View style={styles.header_container}>
        <BackBtnComponent />
        <SettingsBtnComponent />
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
    </View>
  );
}

export default IndividualClimbPage;
