import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => (
  <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
);

export default SessionProvider;

// State Mangement Code:
// _layout:
// <SessionProvider session={session}>
//   <Stack screenOptions={{ headerShown: false }}>
//     <Stack.Protected guard={!!session}>
//       <Stack.Screen name="(pages)" />
//     </Stack.Protected>

//     <Stack.Protected guard={!session}>
//       <Stack.Screen name="login" />
//       <Stack.Screen name="signup" />
//     </Stack.Protected>
//   </Stack>
// </SessionProvider>

//   const [session, setSession] = useState<Session | null>(null);

// useEffect(() => {
//   supabase.auth.getSession().then(({ data: { session } }) => {
//     setSession(session);
//   });

//   supabase.auth.onAuthStateChange((_event, session) => {
//     setSession(session);
//   });
// }, []);