import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./BackButton.styles";

function BackButton() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push(`/profile`);
  };

  return (
    <TouchableOpacity onPress={() => handleRedirect()}>
      <View style={styles.container}>
        <Icon name="arrow-left-line" size="24"></Icon>
        <View style={styles.text_container}>
          <Text style={styles.text}>Back</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BackButton;