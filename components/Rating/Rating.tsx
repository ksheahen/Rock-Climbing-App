import { Text, View } from "react-native";
import { styles } from "./Rating.styles";

export const Rating = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rating</Text>
      <View style={styles.stars_container}>
        <Text style={styles.stars}>Placeholder</Text>
      </View>
    </View>
  );
};
