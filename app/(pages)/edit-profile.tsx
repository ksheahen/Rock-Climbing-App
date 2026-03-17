import { supabase } from "@/services/supabaseClient";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getUserById } from "../../services/userService";
import type { User } from "../../types/User";
import styles from "../styles/edit-profile";

function EditProfilePage() {
  const navigation = useNavigation();

  const [userID, setUserID] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [selectedPFP, setSelectedPFP] = useState("pfp_4.png");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const userData: User | null = await getUserById(user.id);

        if (!userData) {
          throw new Error("User not found");
        }

        setUserID(userData.user_id);
        setName(userData.name);
        setEmail(userData.email);
      } catch (error) {
        if (error instanceof Error) Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!userID) return;
    console.log("Test");
    if (!name.trim() || !email.trim()) {
      Alert.alert("Validation Error", "Name and email cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: email,
        data: {
          display_name: name,
        },
      });

      if (error) throw error;

      const { tableData, tableError } = await supabase
        .from("user")
        .update({ name, email, instagram_handle: instagramHandle, profile_picture: selectedPFP })
        .eq("user_id", userID)
        .single();

      if (tableError) throw tableError;

      console.log("Saving");
      Alert.alert("Success", "Profile updated!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("profile" as never),
        },
      ]);
    } catch (error) {
      if (error instanceof Error) Alert.alert("Error", error.message);
      console.log("Saving error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const handlePFP = (filename: string) => {
    console.log("PFP");
    setSelectedPFP(filename);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Edit Profile</Text>
        <Text style={styles.label}>Profile Picture</Text>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => handlePFP("pfp_1.png")}>
            <Image
              source={require("../../assets/pfp_1.png")}
              style={[
                styles.avatar,
                selectedPFP === "pfp_1.png" && styles.avatarSelected,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePFP("pfp_2.png")}>
            <Image
              source={require("../../assets/pfp_2.png")}
              style={[
                styles.avatar,
                selectedPFP === "pfp_2.png" && styles.avatarSelected,
              ]}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={() => handlePFP("pfp_3.png")}>
            <Image
              source={require("../../assets/pfp_3.png")}
              style={[
                styles.avatar,
                selectedPFP === "pfp_3.png" && styles.avatarSelected,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePFP("pfp_4.png")}>
            <Image
              source={require("../../assets/pfp_4.png")}
              style={[
                styles.avatar,
                selectedPFP === "pfp_4.png" && styles.avatarSelected,
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={styles.input}
            value={instagramHandle}
            onChangeText={setInstagramHandle}
            placeholder="Your Instagram"
            keyboardType="twitter"
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.navigate("profile" as never)}
            disabled={saving}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default EditProfilePage;
