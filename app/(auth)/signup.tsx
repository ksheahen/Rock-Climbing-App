import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Email, Password } from "../../components";
import { styles } from "./signup.styles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // TODO: Find something else and/or create our own logo
  const logo = require("../../assets/icon.png");
  const btnText = "Signup";
  const router = useRouter();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* App Logo */}
        <Image source={logo} alt="logo" style={styles.logo} />

        {/* Email Container */}
        <Email email={email} setEmail={setEmail} />

        {/* Password Container - add eye symbol for revealing pwd*/}
        <Password
          password={password}
          setPassword={setPassword}
          displayText="Create Password"
        />
        <Password
          password={password}
          setPassword={setPassword}
          displayText="Confirm Password"
        />

        <View style={styles.forgotPasswordContainer}>
          <Text></Text>
        </View>

        {/* Button Component */}
        {/* TODO: Update what button does onPress */}
        <Button title={btnText} onPress={() => router.navigate("/")} />

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
};

export default Signup;
