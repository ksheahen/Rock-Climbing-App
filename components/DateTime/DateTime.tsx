import { Text, View } from "react-native";
import { styles } from "./DateTime.styles";

export const DateTime = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date/Time</Text>
      <View style={styles.datetime_container}>
        <Text style={styles.datetime}>Placeholder</Text>
      </View>
    </View>
  );
};
