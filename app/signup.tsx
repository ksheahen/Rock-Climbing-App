import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, AppState, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "./(components)/button";
import EmailComponent from "./(components)/email";
import PasswordComponent from "./(components)/password";
import styles from "./styles/signup";

// Refreshes session automatically if the app is in the foreground
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // TODO: Find something else and/or create our own logo
  const logo = require("../assets/icon.png");
  const btnText = "Signup";
  const router = useRouter();

  // Sign Up using Email
  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* App Logo */}
        <Image source={logo} alt="logo" style={styles.logo} />

        {/* Email Container */}
        <EmailComponent email={email} setEmail={setEmail} />

        {/* Password Container - add eye symbol for revealing pwd*/}
        <PasswordComponent
          password={password}
          setPassword={setPassword}
          displayText="Create Password"
        />
        <PasswordComponent
          password={confirmPassword}
          setPassword={setConfirmPassword}
          displayText="Confirm Password"
        />

        <View style={styles.forgotPasswordContainer}>
          <Text></Text>
        </View>

        {/* Button Component */}
        <ButtonComponent
          title={btnText}
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />

        <Text>
          Already have an account? Login{" "}
          <Text
            onPress={() => router.navigate("/login")}
            style={{ color: "#007AFF", textDecorationLine: "underline" }}
          >
            here.
          </Text>
        </Text>
      </SafeAreaView>
    </>
  );
}
