import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/button";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

function ButtonComponent({ onPress, title }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonComponent;
