import { ScrollView, Text, View } from "react-native";
import {
  Attempt,
  Category,
  Complete,
  DateTime,
  Description,
  Difficulty,
  Header,
  Line,
  Media,
  Rating,
  Type,
} from "../../components";
import { styles } from "./log.styles";

function LogAscent() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
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
        <Line />
        <Media />
      </ScrollView>
    </View>
  );
}

export default LogAscent;
