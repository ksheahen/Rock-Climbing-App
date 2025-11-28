import Button from "@/components/Button/Button";
import Email from "@/components/Email/Email";
import { Password } from "@/components/Password/Password";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, AppState, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/signup.styles";

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
  const [error, setError] = useState<string | null>(null);
  const logo = require("../../assets/icon.png");
  const btnText = "Signup";
  const router = useRouter();

  async function signUpWithEmail() {
    if (!email) {
      setError("Email is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else if (!data?.session) {
      Alert.alert("Please check your inbox for email verification!");
    } else {
      setError("Unexpected error occurred during signup");
    }

    if (!error) {
      router.navigate("/login");
    }
    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Image source={logo} alt="logo" style={styles.logo} />

        <Email email={email} setEmail={setEmail} />

        <Password
          password={password}
          setPassword={setPassword}
          displayText="Create Password"
        />
        <Password
          password={confirmPassword}
          setPassword={setConfirmPassword}
          displayText="Confirm Password"
        />
        {error && <Text>{error}</Text>}
        <View style={styles.forgotPasswordContainer}>
          <Text></Text>
        </View>

        <Button
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