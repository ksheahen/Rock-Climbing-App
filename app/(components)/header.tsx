import { View, Text, Pressable } from "react-native";
import { styles } from "../styles/header";

export default function HeaderComponent({
  leftText,
  rightText,
  onLeftPress,
  onRightPress,
}) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onLeftPress} style={styles.button}>
        <Text style={styles.buttonText}>{leftText}</Text>
      </Pressable>
      <Pressable onPress={onRightPress} style={styles.button}>
        <Text style={styles.buttonText}>{rightText}</Text>
      </Pressable>
    </View>
  );
}
