import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "./Password.styles";

// TODO: May need updating for security purposes
export interface PasswordProps {
  password: string;
  setPassword: (text: string) => void;
  displayText: string;
}

export const Password = ({
  password,
  setPassword,
  displayText,
}: PasswordProps) => {
  return (
    <View style={styles.passwordContainer}>
      <MaterialIcons name="lock" size={20} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder={displayText}
        placeholderTextColor={global.colors.text_2}
        autoCapitalize={"none"}
        secureTextEntry={true}
      />
    </View>
  );
};
