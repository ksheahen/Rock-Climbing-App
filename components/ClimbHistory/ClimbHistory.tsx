import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ClimbHistory.styles";

export const ClimbHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>2025-08-18</Text>

      <View style={styles.climbItem}>
        <View style={styles.info}>
          <Text style={styles.time}>6:55 PM</Text>
          <View style={styles.gradeRow}>
            <Icon name="check-line" size="18" />
            <Text style={styles.grade}>7c+/V10</Text>
            <Text style={styles.stars}>★★★</Text>
          </View>
          <Text style={styles.sub}>2 Tries</Text>
        </View>
        <Pressable style={styles.videoButton}>
          <Text style={styles.videoText}>video{"\n"}preview</Text>
        </Pressable>
      </View>

      <View style={styles.climbItem}>
        <View style={styles.info}>
          <Text style={styles.time}>5:50 PM</Text>
          <View style={styles.gradeRow}>
            <Icon name="check-line" size="18" />
            <Text style={styles.grade}>7b/V8</Text>
            <Text style={styles.stars}>★★☆☆☆</Text>
          </View>
          <Text style={styles.sub}>Flash</Text>
        </View>
        <Pressable style={styles.videoButton}>
          <Text style={styles.videoText}>video{"\n"}preview</Text>
        </Pressable>
      </View>
    </View>
  );
};
