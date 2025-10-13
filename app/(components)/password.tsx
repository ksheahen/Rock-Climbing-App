import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { COLORS } from "../styles/global-styles";
import { styles } from "../styles/login";

// TODO: May need updating for security purposes
interface PasswordProps {
  password: string;
  setPassword: (text: string) => void;
}

function PasswordComponent({ password, setPassword }: PasswordProps) {
  return (
    <View style={styles.passwordContainer}>
      <MaterialIcons name="lock" size={20} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        placeholderTextColor={COLORS.text2}
        autoCapitalize={"none"}
        secureTextEntry={true}
      />
    </View>
  );
}

export default PasswordComponent;
