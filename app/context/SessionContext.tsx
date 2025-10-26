import { Session } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => (
  <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
);
