import { TouchableOpacity, Text } from "react-native";
import { styles } from "./Button.styles";

export interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const Button = ({ onPress, title }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
