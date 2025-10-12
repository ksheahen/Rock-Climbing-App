import { View, Text } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "../styles/media";

function MediaComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media</Text>
      <View style={styles.mediaBox}>
        <Icon name="attachment-2" size="28" color="#C7C7CC" />
      </View>
    </View>
  );
}

export default MediaComponent;
