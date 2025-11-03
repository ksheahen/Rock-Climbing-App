import { Text, View } from "react-native";
import { styles } from "./Description.styles";

export const Description = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <View style={styles.description_container}>
        <Text style={styles.description}>Placeholder</Text>
      </View>
    </View>
  );
};

