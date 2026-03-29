import { syncLocalClimbsSQLite } from "@/services/climbService";
import { supabase } from "@/services/supabaseClient";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { Alert, Image, Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { styles } from "./ProfileInfo.styles";

type ProfileInfoProps = {
  onSync?: () => Promise<void>;
  isSyncing?: boolean;
};

export function ProfileInfo({ onSync, isSyncing }: ProfileInfoProps) {
  const router = useRouter();
  const db = useSQLiteContext();
  const [displayName, setDisplayName] = useState<string>("");
  const [instagramHandle, setInstagramHandle] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState("pfp_4.png");

  useFocusEffect(() => {
    fetchUserData();
  });

  const handleSyncPress = async () => {
    console.log("TEST HERE");
    console.log(isSyncing);
    if (!onSync || isSyncing) return;
    try {
      await onSync();
    } catch (error) {
      console.error("Sync failed:", error);
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
        .select("name, email, profile_picture")
        .eq("user_id", user.id)
        .single();

      setDisplayName(profile?.name || user.email?.split("@")[0] || "User");
      setInstagramHandle(
        user.email?.split("@")[0] || profile?.email || "username",
      );
      setProfilePicture(profile?.profile_picture || "pfp_4.png");
    } else if (!user) {
      setDisplayName("");
      setInstagramHandle("");
      setProfilePicture("pfp_4.png");
    }
  };

  const profilePictures: Record<string, any> = {
    "pfp_1.png": require("../../assets/pfp_1.png"),
    "pfp_2.png": require("../../assets/pfp_2.png"),
    "pfp_3.png": require("../../assets/pfp_3.png"),
    "pfp_4.png": require("../../assets/pfp_4.png"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={
            profilePictures[profilePicture] || profilePictures["pfp_4.png"]
          }
          style={styles.avatarPlaceholder}
        />
        <View style={{ gap: 10 }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Pressable
              style={styles.editButton}
              onPress={() => router.navigate("/edit-profile")}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
            <Pressable
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#F7F7FC",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleSyncPress}
            >
              <MaterialIcons name="sync" size={16} color="black" />
            </Pressable>
          </View>
          {/* Temporary Sign out button */}
          {/* <Pressable
            style={styles.editButton}
            onPress={() => supabase.auth.signOut()}
          >
            <Text style={styles.editButtonText}>Sign Out</Text>
          </Pressable> */}
          <Pressable
            style={styles.editButton}
            onPress={() => router.navigate("/(pages)/achievements")}
          >
            <Text style={styles.editButtonText}>Achievements</Text>
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
