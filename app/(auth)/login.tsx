import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComponent from "../(components)/button";
import EmailComponent from "../(components)/email";
import PasswordComponent from "../(components)/password";
import { styles } from "../styles/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: Find something else and/or create our own logo
  const logo = require("../../assets/icon.png");
  const login = "Login";
  const router = useRouter();
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
        <ButtonComponent title={login} onPress={() => router.navigate("/")} />

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
};

export default Login;
