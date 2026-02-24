import { supabase } from "@/services/supabaseClient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../../components/Button/Button";
import EmailComponent from "../../components/Email/Email";
import PasswordComponent from "../../components/Password/Password";
import styles from "../styles/login.styles";
import BackButton from "@/components/BackButton/BackButton";

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

  async function handleForgotPassword() {
    if (!email) {
      setEmailError(true);
      setError("Enter your email above, then tap Forgot Password");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "rockclimbingapp://login",
    });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert(
        "Check your email",
        "A password reset link has been sent to " + email,
      );
    }
    setLoading(false);
  }

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

      let hasEmailErr = false;
      let hasPasswordErr = false;

      if (
        errorMessage.includes("password") ||
        errorMessage.includes("invalid") ||
        errorMessage.includes("credentials")
      ) {
        hasPasswordErr = true;
      }

      if (
        errorMessage.includes("email") ||
        errorMessage.includes("user") ||
        errorMessage.includes("not found")
      ) {
        hasEmailErr = true;
      }

      if (!hasEmailErr && !hasPasswordErr) {
        hasEmailErr = true;
        hasPasswordErr = true;
      }

      setEmailError(hasEmailErr);
      setPasswordError(hasPasswordErr);
    } else {
      router.navigate("/profile");
    }
    setLoading(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <BackButton />
      </View>
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
          <Text onPress={handleForgotPassword}> Forgot Password?</Text>
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
