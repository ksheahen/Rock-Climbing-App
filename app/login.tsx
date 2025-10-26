import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, AppState, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "./(components)/button";
import EmailComponent from "./(components)/email";
import PasswordComponent from "./(components)/password";
import styles from "./styles/login";

// Refreshes session automtically if the app is in the foreground
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const logo = require("../assets/icon.png");
  const login = "Login";
  const router = useRouter();

  // Sign In with Email
  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
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
          displayText="Password"
        />

        {/* Forgot Password */}
        <View style={styles.forgotPasswordContainer}>
          <Text onPress={() => router.navigate("/")}> Forgot Password?</Text>
        </View>

        {/* Button Component */}
        {/* TODO: Update what button does onPress */}
        <ButtonComponent
          title={login}
          disabled={loading}
          onPress={() => signInWithEmail()}
        />

        <Text>
          Don&apos;t have an account? Signup{" "}
          <Text
            onPress={() => router.navigate("/signup")}
            style={{ color: "#007AFF", textDecorationLine: "underline" }}
          >
            here.
          </Text>
        </Text>
      </SafeAreaView>
    </>
  );
}
