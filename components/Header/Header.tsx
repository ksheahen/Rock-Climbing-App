import { Pressable, Text, View } from "react-native";
import { styles } from "./Header.styles";

interface HeaderProps {
  leftText: string;
  rightText: string;
  onLeftPress: () => void;
  onRightPress: () => void;
}

function Header({
  leftText,
  rightText,
  onLeftPress,
  onRightPress,
}: HeaderProps) {
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

export default Header;