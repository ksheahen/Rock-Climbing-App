import { supabase } from "@/services/supabaseClient";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { getUserById, updateUser } from "../../services/userService";
import type { User } from "../../types/User";
import styles from "../styles/edit-profile";

function EditProfilePage() {
  const navigation = useNavigation();

  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        setUserId(user.id);

        const userData: User | null = await getUserById(user.id);
        if (!userData) throw new Error("User not found");

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
    if (!userId) return;

    if (!name.trim() || !email.trim()) {
      Alert.alert("Validation Error", "Name and email cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      const updatedUser = await updateUser(userId, { name, email });
      if (!updatedUser) throw new Error("Failed to update user.");

      Alert.alert("Success", "Profile updated!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("profile" as never),
        },
      ]);
    } catch (error) {
      if (error instanceof Error) Alert.alert("Error", error.message);
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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Edit Profile</Text>

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
