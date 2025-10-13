import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { styles } from "../styles/login";

interface EmailProps {
  email: string;
  setEmail: (text: string) => void;
}

function EmailComponent({ email, setEmail }: EmailProps) {
  return (
    <View style={styles.emailContainer}>
      <MaterialIcons name="email" size={20} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email Address"
        autoCapitalize={"none"}
        autoComplete={"email"}
      />
    </View>
  );
}

export default EmailComponent;
