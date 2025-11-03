import { View } from "react-native";
import {
  Attempt,
  Category,
  Complete,
  DateTime,
  Description,
  Difficulty,
  Line,
  Rating,
  Type,
} from "../../components";
import { styles } from "./individual-climb-page.styles";

function IndividualClimbPage() {
  return (
    <View style={styles.container}>
      <View style={styles.media}></View>
      <Category />
      <Line />
      <Type />
      <Line />
      <Complete />
      <Line />
      <Attempt />
      <Line />
      <Difficulty />
      <Line />
      <Rating />
      <Line />
      <DateTime />
      <Line />
      <Description />
    </View>
  );
}

export default IndividualClimbPage;
