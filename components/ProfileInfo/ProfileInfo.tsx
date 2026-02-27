import { syncLocalClimbsSQLite } from "@/services/climbService";
import { supabase } from "@/services/supabaseClient";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ProfileInfo.styles";

export function ProfileInfo() {
  const router = useRouter();
  const db = useSQLiteContext();
  const [displayName, setDisplayName] = useState<string>("");
  const [instagramHandle, setInstagramHandle] = useState<string>("");

  useEffect(() => {
    fetchUserData();
  }, []);

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

  // Fetch user data (if logged in recently otherwise it will display a generic name)
  const fetchUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // getting displayname and what not
      const { data: profile } = await supabase
        .from("user")
        .select("name, email")
        .eq("user_id", user.id)
        .single();

      setDisplayName(profile?.name || user.email?.split("@")[0] || "User");
      setInstagramHandle(
        user.email?.split("@")[0] || profile?.email || "username",
      );
    } else if (!user) {
      // TODO: Remove Static Data / Fix this in user onboarding
      setDisplayName("");
      setInstagramHandle("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarPlaceholder} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          {/* Temporary Sign out button */}
          {/* <Pressable
            style={styles.editButton}
            onPress={() => supabase.auth.signOut()}
          >
            <Text style={styles.editButtonText}>Sign Out</Text>
          </Pressable> */}
          <Pressable
            style={styles.editButton}
            onPress={() => router.navigate("/edit-profile")}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
          <Pressable
            style={{
              padding: 8,
              backgroundColor: "#F7F7FC",
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
      <Text style={styles.name}>{displayName}</Text>
      <View style={styles.socialRow}>
        <Icon name="instagram-line" size="20" />
        <Text style={styles.handle}>{instagramHandle}</Text>
      </View>
    </View>
  );
}
