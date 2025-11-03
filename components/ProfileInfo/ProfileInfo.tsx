import { Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ProfileInfo.styles";

export const ProfileInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarPlaceholder} />
        <Pressable style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>
      <Text style={styles.name}>Thane Tate</Text>
      <View style={styles.socialRow}>
        <Icon name="instagram-line" size="20" />
        <Text style={styles.handle}>thanefalls</Text>
      </View>
    </View>
  );
};
