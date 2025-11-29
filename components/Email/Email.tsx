import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import colors from "../../theme/index";
import styles from "../../app/styles/login.styles";

interface EmailProps {
  email: string;
  setEmail: (text: string) => void;
  inputStyle?: object;
}

function EmailComponent({ email, setEmail, inputStyle }: EmailProps) {
  return (
    <View style={styles.emailContainer}>
      <MaterialIcons name="email" size={20} />
      <TextInput
        style={[styles.input, inputStyle]}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email Address"
        placeholderTextColor={colors.colors.text_2}
        autoCapitalize={"none"}
        autoComplete={"email"}
      />
    </View>
  );
}

export default EmailComponent;
