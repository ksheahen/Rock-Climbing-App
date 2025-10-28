import { Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/backbtn";

function BackbtnComponent() {
  return (
    <View style={styles.container}>
      <Icon name="arrow-left-line" size="24"></Icon>
      <View style={styles.text_container}>
        <Text style={styles.text}>Back</Text>
      </View>
    </View>
  );
}

export default BackbtnComponent;
