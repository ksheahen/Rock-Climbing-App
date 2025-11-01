import { Pressable, Text, View } from "react-native";
import styles from "../styles/profileinfo";
import { useNavigation } from "@react-navigation/native";

interface ProfileInfoProps {
  user?: {
    name: string;
  };
}

function ProfileInfoComponent({ user }: ProfileInfoProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarPlaceholder} />
        <Pressable
          style={styles.editButton}
          onPress={() => navigation.navigate("edit-profile" as never)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>
      </View>
      <Text style={styles.name}>{user?.name ?? "Your name here"}</Text>
    </View>
  );
}

export default ProfileInfoComponent;




