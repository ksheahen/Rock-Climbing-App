import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Pick the URL
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
if (!SUPABASE_URL) throw new Error("SUPABASE_URL is missing in .env");

// Choose the key based on environment
let SUPABASE_KEY: string;

if (process.env.NODE_ENV === "test") {
  // Use service role key for testing / server-side tasks
  SUPABASE_KEY = process.env.EXPO_SUPABASE_SERVICE_ROLE_KEY!;
  if (!SUPABASE_KEY)
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing in .env");
} else {
  // Use anon/publishable key for normal operations
  SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
  if (!SUPABASE_KEY)
    throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env");
}

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: process.env.NODE_ENV === "test" ? undefined : AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
