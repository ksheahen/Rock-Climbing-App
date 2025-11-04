import { View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./SettingsButton.styles";

function SettingsButton() {
  return (
    <View style={styles.container}>
      <Icon name="settings-3-line" size="24"></Icon>
    </View>
  );
}

export default SettingsButton;
