import { Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/backbtn";
import { COLORS } from "../styles/global-styles";

function BackBtnComponent() {
  return (
    <View style={styles.container}>
      <Icon name="arrow-left-line" size={24} color={COLORS.text1} />
      <Text style={styles.button_text}>Back</Text>
    </View>
  );
}

export default BackBtnComponent;
