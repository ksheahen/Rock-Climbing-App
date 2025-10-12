import { View } from "react-native";
import Icon from "react-native-remix-icon";
import { COLORS } from "../styles/global-styles";
import styles from "../styles/settingsbtn";

function SettingsBtnComponent() {
  return (
    <View style={styles.container}>
      <Icon name="settings-4-line" size={24} color={COLORS.text1} />
    </View>
  );
}

export default SettingsBtnComponent;
