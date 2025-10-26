import { Text, TouchableOpacity } from "react-native";
import styles from "../styles/button";

interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

function ButtonComponent({ onPress, title, disabled }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export default ButtonComponent;
