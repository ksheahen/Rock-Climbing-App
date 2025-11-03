import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { COLORS } from "../../theme";
import { styles } from "./Email.styles";

export interface EmailProps {
  email: string;
  setEmail: (text: string) => void;
}

export const Email = ({ email, setEmail }: EmailProps) => {
  return (
    <View style={styles.emailContainer}>
      <MaterialIcons name="email" size={20} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email Address"
        placeholderTextColor={COLORS.text2}
        autoCapitalize={"none"}
        autoComplete={"email"}
      />
    </View>
  );
};
