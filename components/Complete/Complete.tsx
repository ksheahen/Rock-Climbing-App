import { Text, View } from "react-native";
import { styles } from "./Complete.styles";

export const Complete = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Did you complete this problem?</Text>
      <View style={styles.dropdown_container}>
        <Text style={styles.dropdown}>Yes</Text>
        {/* TODO: This should be a button that changes between YES or NO when you click on it */}
      </View>
    </View>
  );
};
