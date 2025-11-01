import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useNavigation } from "expo-router";
import styles from "../styles/edit-profile";
import React, { useState } from "react";

function EditProfilePage() {
  const navigation = useNavigation();
  const [name, setName] = React.useState("name here");
  const [email, setEmail] = React.useState("name@example.com");

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
          />
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.saveButton]}
            onPress={() => Alert.alert("Save clicked!")}
          >
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default EditProfilePage;