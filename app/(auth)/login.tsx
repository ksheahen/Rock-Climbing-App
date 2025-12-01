import { ButtonComponent, EmailComponent } from "@/components";
import { PasswordComponent } from "@/components/Password/Password";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, AppState, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/login.styles";

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
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const logo = require("../../assets/icon.png");
  const login = "Login";
  const router = useRouter();

  // Small styling changes for if invlaid email/password
  const invalidInputStyle = {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 6,
  };

  // handleEmailChange Function
  function handleEmailChange(text: string) {
    setEmail(text);
    if (emailError) setEmailError(false);
    if (error) setError(null);
  }

  // hanldePasswordChange Function
  function handlePasswordChange(text: string) {
    setPassword(text);
    if (passwordError) setPasswordError(false);
    if (error) setError(null);
  }

  // Sign In with Email
  async function signInWithEmail() {
    if (!email) {
      setEmailError(true);
      setError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError(true);
      setError("Password is required");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setError(error.message);

      const errorMessage = (error.message || "").toLowerCase();

      // Set Password Error to True
      if (
        errorMessage.includes("password") ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("credentials")
      ) {
        setPasswordError(true);
      }

      // Set Email Error to True
      if (
        errorMessage.includes("email") ||
        errorMessage.includes("user") ||
        errorMessage.includes("not found")
      ) {
        setEmailError(true);
      }

      // If auth fails mark both as invalid
      if (!emailError && !passwordError) {
        setEmailError(true);
        setPasswordError(true);
      }
    } else {
      router.navigate("/");
    }
    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Image source={logo} alt="logo" style={styles.logo} />
        <EmailComponent
          email={email}
          setEmail={handleEmailChange}
          inputStyle={emailError ? invalidInputStyle : undefined}
        />
        <PasswordComponent
          password={password}
          setPassword={handlePasswordChange}
          displayText="Password"
          inputStyle={passwordError ? invalidInputStyle : undefined}
        />
        {error && (
          <Text
            style={{
              color: "#8B0000",
              backgroundColor: "#fdecea",
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 6,
              fontWeight: "bold",
              fontSize: 13,
              marginTop: 8,
            }}
          >
            {error}
          </Text>
        )}
        <View style={styles.forgotPasswordContainer}>
          <Text onPress={() => router.navigate("/")}> Forgot Password?</Text>
        </View>
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