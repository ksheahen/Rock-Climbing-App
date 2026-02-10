import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "@/components/Button/Button";
import EmailComponent from "@/components/Email/Email";
import PasswordComponent from "@/components/Password/Password";
import { global } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Login from "./login";

const backgroundColor = (isLight: boolean) => (isLight ? "blue" : "lightblue");
const color = (isLight: any) => backgroundColor(!isLight);

const Square = ({
  isLight,
  selected,
}: {
  isLight: boolean;
  selected: boolean;
}) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
  } else {
    backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

// Login Button for Last Page
const LoginBtn = () => {
  const nav = useRouter();
  const [email, setEmail] = useState("");

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Create an account below</Text>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 120,
          paddingLeft: 40,
          paddingRight: 40,
          backgroundColor: global.colors.background_1,
        }}
      >
        <EmailComponent email={email} setEmail={handleEmailChange} />
        <PasswordComponent
          password={email}
          setPassword={handleEmailChange}
          displayText="Password"
        />
        <ButtonComponent
          onPress={() => nav.navigate("/login")}
          title="Create Account"
        />
      </View>
    </View>
  );
};

// Getting Start Button and Text
const GetStarted = () => {
  const nav = useRouter();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <ButtonComponent onPress={() => nav.navigate("/")} title="Get Started" />
      <View style={{}}>
        <Text>Already have an account? Login here.</Text>
      </View>
    </View>
  );
};

// Main Onboarding Page Function
const OnboardingPage = () => {
  const nav = useRouter();

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      console.log("Onboarding complete. Flag set in AsyncStorage.");
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log("asyncStorage contents: ", items);
      nav.replace("/signup");
    } catch (error) {
      console.error("Error setting onboarding flag:", error);
    }
  };

  console.log("onboarding page rendered");

  return (
    <Onboarding
      showSkip={false}
      showDone={true}
      onDone={handleOnboardingComplete}
      DotComponent={Square}
      bottomBarColor={global.colors.background_1}
      bottomBarHeight={100}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/icon.png")}
              style={{ height: 150, width: 150 }}
            />
          ),
          title: "Rock Climbing",
          subtitle: <GetStarted />,
          canSwipeForward: true,
        },
        {
          backgroundColor: "#fff",
          image: <Ionicons ellipse />,
          title: "Track your climbs",
          subtitle: "Tap the + icon to add a log",
          canSwipeBackward: true,
          canSwipeForward: true,
        },
        {
          backgroundColor: "#fff",
          image: <Ionicons ellipse />,
          title: "See Your Progress",
          subtitle: "View your climbs on your profile",
          canSwipeBackward: true,
          canSwipeForward: true,
        },
        {
          backgroundColor: "#fff",
          image: <Ionicons ellipse />,
          title: "Start Climbing Today",
          subtitle: <LoginBtn />,
          canSwipeBackward: true,
        },
      ]}
    />
  );
};

export default OnboardingPage;
