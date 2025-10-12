import { Pressable, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "../styles/bottom-nav";

function BottomNavComponent() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton}>
        <Icon name="line-chart-line" size="26" />
      </Pressable>
      <Pressable style={styles.iconButton}>
        <Icon name="add-circle-line" size="36" />
      </Pressable>
      <Pressable style={styles.iconButton}>
        <Icon name="user-line" size="26" />
      </Pressable>
    </View>
  );
}

export default BottomNavComponent;
