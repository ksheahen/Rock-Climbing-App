import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, AppState, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../../components/Button/Button";
import EmailComponent from "../../components/Email/Email";
import PasswordComponent from "../../components/Password/Password";
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
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const logo = require("../../assets/icon.png");
  const btnText = "Signup";
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
    if (confirmPasswordError) setConfirmPasswordError(false);
    if (error) setError(null);
  }

  // handleConfirmPasswordChange Function
  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError(false);
    if (passwordError) setPasswordError(false);
    if (error) setError(null);
  }

  // Sign up with Email
  async function signUpWithEmail() {
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

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      setError("Passwords do not match");
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      const errorMessage = (error.message || "").toLowerCase();

      // If error message includes passowrd, set the password error to true
      if (
        errorMessage.includes("password") ||
        errorMessage.includes("weak") ||
        errorMessage.includes("invalid")
      ) {
        setPasswordError(true);
        setConfirmPasswordError(true);
      }

      // If the error message includes email, set the email error to true
      if (
        errorMessage.includes("email") ||
        errorMessage.includes("user") ||
        errorMessage.includes("already")
      ) {
        setEmailError(true);
      }
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

        <EmailComponent
          email={email}
          setEmail={handleEmailChange}
          inputStyle={emailError ? invalidInputStyle : undefined}
        />

        <PasswordComponent
          password={password}
          setPassword={handlePasswordChange}
          displayText="Create Password"
          inputStyle={passwordError ? invalidInputStyle : undefined}
        />
        <PasswordComponent
          password={confirmPassword}
          setPassword={handleConfirmPasswordChange}
          displayText="Confirm Password"
          inputStyle={confirmPasswordError ? invalidInputStyle : undefined}
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
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            {error}
          </Text>
        )}

        <View style={{ paddingBottom: 10 }} />

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
