import { View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/settingsbtn";

function SettingsbtnComponent() {
  return (
    <View style={styles.container}>
      <Icon name="settings-3-line" size="24"></Icon>
    </View>
  );
}

export default SettingsbtnComponent;
