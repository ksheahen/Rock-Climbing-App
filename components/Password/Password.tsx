import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import colors from "../../theme/index";
import styles from "../../app/styles/login.styles";

// TODO: May need updating for security purposes
interface PasswordProps {
  password: string;
  setPassword: (text: string) => void;
  displayText: string;
  inputStyle?: object;
}

export function PasswordComponent({
  password,
  setPassword,
  displayText,
  inputStyle,
}: PasswordProps) {
  return (
    <View style={styles.passwordContainer}>
      <MaterialIcons name="lock" size={20} />
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder={displayText}
        placeholderTextColor={colors.colors.text.secondary}
        autoCapitalize={"none"}
        secureTextEntry={true}
      />
    </View>
  );
}
