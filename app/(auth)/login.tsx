import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { styles } from "../styles/login";
import EmailComponent from "../(components)/email";
import PasswordComponent from "../(components)/password";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logo = require("../../assets/icon.png");
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Image source={logo} alt="logo" style={styles.logo} />

      {/* Email Container */}
      <EmailComponent email={email} setEmail={setEmail} />

      {/* Password Container */}
      <PasswordComponent password={password} setPassword={setPassword} />

      {/* Misc stuff  - forgot pwd, sign up here, login btn */}
      <Text onPress={() => router.navigate("/")}> Forgot Password?</Text>
      <Button title="Log In" />
      <Text>Dont have an account? Sign up here.</Text>
    </View>
  );
};

export default Login;
