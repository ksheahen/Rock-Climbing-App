import { supabase } from "@/services/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SessionProvider } from "./context/SessionContext";

function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // console.log("Session from getSession:", session); // Debugging line
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("Session from onAuthStateChange:", session); // Debugging line
      setSession(session);
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(pages)" />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack.Protected>
      </Stack>
    </SessionProvider>
  );
}

export default RootLayout;
