import { View } from "react-native";
import styles from "./Line.styles";

export function Line() {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
    </View>
  );
}