import { Text } from "react-native";
import AttemptComponent from "../(components)/attempt";
import CategoryComponent from "../(components)/category";
import CompleteComponent from "../(components)/complete";
import DateTimeComponent from "../(components)/datetime";
import DescriptionComponent from "../(components)/description";
import DifficultyComponent from "../(components)/difficulty";
import LineComponent from "../(components)/line";
import RatingComponent from "../(components)/rating";
import TypeComponent from "../(components)/type";

function IndividualClimbPage() {
  return (
    <>
      <Text>individual climb page</Text>
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
    </>
  );
}

export default IndividualClimbPage;
