import { Text, View } from "react-native";
import { styles } from "../styles/description";

function DescriptionComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Description</Text>
      <View style={styles.description_container}>
        <Text style={styles.description}>Placeholder</Text>
      </View>
    </View>
  );
}

export default DescriptionComponent;
