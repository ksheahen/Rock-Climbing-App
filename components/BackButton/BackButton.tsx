import { useNavigationState, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-remix-icon";
import styles from "./BackButton.styles";

interface BackButtonProps {
  url?: string;
}

function BackButton({ url }: BackButtonProps) {
  const router = useRouter();
  const navIndex = useNavigationState((state) => state.index);

  const handleRedirect = () => {
    if (url) {
      router.push(url as any);
    } else if (navIndex > 0) {
      router.back();
    } else {
      router.replace("/");
    }
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
