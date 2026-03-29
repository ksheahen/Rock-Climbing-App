import ButtonComponent from "@/components/Button/Button";
import { supabase } from "@/services/supabaseClient";
import { global } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailComponent from "../../components/Email/Email";
import PasswordComponent from "../../components/Password/Password";
import styles from "../styles/login.styles";

const backgroundColor = (isLight: boolean) => (isLight ? "blue" : "lightblue");
const color = (isLight: any) => backgroundColor(!isLight);

const { width, height } = Dimensions.get("window");
const videoWidth = Math.min(width * 0.9, 600);
const videoHeight = Math.min(height * 0.5, 450);
const logoSize = Math.min(width * 0.6, 400);


const logo = require("../../assets/icon.png");

const completeOnboarding = async (router: any) => {
  try {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
  } catch (e) {
    console.error("Error setting onboarding flag:", e);
  }
  router.replace("/login");
};

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

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text>Create your account to get started!</Text>
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
        <ButtonComponent
          onPress={() => nav.navigate("/signup")}
          title="Create Account"
        />
      </View>
    </View>
  );
};

// Getting Start Button and Text
const GetStarted = ({ goToNext }: { goToNext: () => void }) => {
  const nav = useRouter();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 250 }}>
        <ButtonComponent onPress={goToNext} title="Get Started" />
      </View>
      <Text>
        {"Already have an account? Login "}
        <Text
          onPress={() => nav.navigate("/login")}
          style={{ color: "#007AFF", textDecorationLine: "underline" }}
        >
          here.
        </Text>
      </Text>
    </View>
  );
};

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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
    } else {
      if (!data?.session) {
        Alert.alert("Please check your inbox for email verification!");
      }
      await completeOnboarding(router);
      return;
    }

    setLoading(false);
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === "ios" ? 300 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{
              width: "100%",
              padding: 30,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: global.colors.background_1,
            }}
          >
            <Image
              source={logo}
              alt="logo"
              style={{ height: logoSize, width: logoSize }}
            />

            <Text style={{ fontSize: 25, padding: 20 }}>
              Start Climbing Today
            </Text>
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

            <View style={{ paddingBottom: 10}} />

            <View style={{ width: 200 }}>
              <ButtonComponent
                title={btnText}
                disabled={loading}
                onPress={() => signUpWithEmail()}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

// Main Onboarding Page Function
const OnboardingPage = () => {
  const nav = useRouter();
  const onboardingRef = useRef<any>(null);

  const handleOnboardingComplete = async () => {
    await completeOnboarding(nav);
  };

  const goToNext = () => {
    if (onboardingRef.current) {
      onboardingRef.current.goToPage(1, true);
    }
  };

  console.log("onboarding page rendered");

  return (
    <Onboarding
      ref={onboardingRef}
      showSkip={false}
      showDone={false}
      onDone={handleOnboardingComplete}
      DotComponent={Square}
      bottomBarColor={global.colors.background_1}
      bottomBarHeight={height - 800}
      bottomBarHighlight={false}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/icon.png")}
              style={{ height: logoSize, width: logoSize }}
            />
          ),
          title: "Rock Climbing",
          subtitle: <GetStarted goToNext={goToNext} />,
        },
        {
          backgroundColor: "#fff",
          image: (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Video
                source={require("../../assets/log_tutorial.mp4")}
                style={{ width: videoWidth, height: videoHeight }}
                isLooping
                isMuted
                shouldPlay
                resizeMode={ResizeMode.CONTAIN}
              />
            </View>
          ),
          title: "Track your climbs",
          subtitle: "Tap the + icon to add a log",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Video
                source={require("../../assets/profile_tutorial.mp4")}
                style={{ width: videoWidth, height: videoHeight }}
                isLooping
                isMuted
                shouldPlay
                resizeMode={ResizeMode.CONTAIN}
              />
            </View>
          ),
          title: "See Your Progress",
          subtitle: "View your climbs on your profile",
        },
        {
          backgroundColor: "#fff",
          image: <View />,
          title: <SignUp />,
          subtitle: "",
        },
      ]}
    />
  );
};

export default OnboardingPage;
