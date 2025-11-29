import { Text, TouchableOpacity } from "react-native";
import { styles } from "./Button.styles";

export interface ButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
}

export function ButtonComponent({ onPress, title, disabled }: ButtonProps) {
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
