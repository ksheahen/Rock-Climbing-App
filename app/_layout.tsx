// import { useAuthState } from "@/utils/authState";
import { Stack } from "expo-router";

const isLoggedIn = false;

function RootLayout() {
  // const { isLoggedIn } = useAuthState();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(pages)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack.Protected>
    </Stack>
  );
}

export default RootLayout;
