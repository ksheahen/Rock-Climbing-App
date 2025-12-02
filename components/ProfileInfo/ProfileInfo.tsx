import { syncLocalClimbsSQLite } from "@/services/climbService";
import { supabase } from "@/services/supabaseClient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { Alert, Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ProfileInfo.styles";

export function ProfileInfo() {
  const router = useRouter();
  const db = useSQLiteContext();

  const handleSyncPress = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.navigate("/login");
    } else {
      try {
        await syncLocalClimbsSQLite(db);
      } catch (err) {
        Alert.alert("Sync failed", "Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarPlaceholder} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={styles.editButton}
            onPress={() => router.navigate("/edit-profile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
          <Pressable
            style={{
              padding: 8,
              backgroundColor: "#eee",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSyncPress}
          >
            <MaterialIcons name="sync" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <Text style={styles.name}>Thane Tate</Text>
      <View style={styles.socialRow}>
        <Icon name="instagram-line" size="20" />
        <Text style={styles.handle}>thanefalls</Text>
      </View>
    </View>
  );
}
