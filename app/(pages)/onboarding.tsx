import ButtonComponent from "@/components/Button/Button";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View, Text } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const Square = ({ isLight, selected }) => {
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

const backgroundColor = (isLight) => (isLight ? "blue" : "lightblue");
const color = (isLight) => backgroundColor(!isLight);

const LoginBtn = () => {
  const nav = useRouter();
  // Calling the login page has the back button, so it navigates out of the onboarding
  // might have to take a diff approach or set a specific navigation to remove the back btn
  return (
    <ButtonComponent onPress={() => nav.navigate("/login")} title="Login" />
  );
};

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

const OnboardingPage = () => {
  return (
    <Onboarding
      showSkip={false}
      showDone={false}
      DotComponent={Square}
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
          title: "2nd Onboarding",
          subtitle: "2nd page",
          canSwipeBackward: true,
          canSwipeForward: true,
        },
        {
          backgroundColor: "#fff",
          image: <Ionicons ellipse />,
          title: "3rd onboarding",
          subtitle: "3rd",
          canSwipeBackward: true,
          canSwipeForward: true,
        },
        {
          backgroundColor: "#fff",
          image: <Ionicons ellipse />,
          title: "4th onboarding",
          subtitle: <LoginBtn />,
          canSwipeBackward: true,
        },
      ]}
    />
  );
};
export default OnboardingPage;
