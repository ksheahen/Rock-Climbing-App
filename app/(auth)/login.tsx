import React, { useState } from "react";
import { Text, TextInput, View, Image, Button } from "react-native";
import { styles } from "../styles/login"
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const logo = require("../../assets/icon.png");
  const router = useRouter();
  return (

    <View style={styles.container}>

      {/* App Logo */}
      <Image source={logo} alt="logo" style={styles.logo}/>

      {/* Email Container */}
      <View style={styles.emailContainer}>
        <MaterialIcons name="email" size={20} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email Address"
          autoCapitalize={"none"}
          autoComplete={"email"}
        />
      </View>

      {/* Password Container */}
      <View style={styles.passwordContainer}>
        <MaterialIcons name="lock" size={20} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
          autoCapitalize={"none"}
          secureTextEntry={true}
        />
      </View>

      {/* Misc stuff  - forgot pwd, sign up here, login btn */}
      <Text onPress={() => router.navigate("/")}> Forgot Password?</Text>
      <Button title="Log In"/>
      <Text>Dont have an account? Sign up here.</Text>
    </View>
  );
};

export default Login;
