import { Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/complete";

function CompleteComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Did you complete this problem?</Text>
      <View style={styles.dropdown_container}>
        <Text style={styles.dropdown}>Yes</Text>
        <View style={styles.icon_container}>
          <Icon name="arrow-drop-down-line" size="24"></Icon>
        </View>
        {/* TODO: This should be a button that changes between YES or NO when you click on it */}
      </View>
    </View>
  );
}

export default CompleteComponent;
