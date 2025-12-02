// initialize our database here
// so that all children of the application
// can use the same database.
// we access this database using the sqlite db hook.

import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";

function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="climb.db"
      onInit={async (db) => {
        // Create new unified climb table matching Supabase schema
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS log_climb3 (
          climb_id TEXT PRIMARY KEY,
          session_id TEXT,
          type TEXT NOT NULL,
          grade TEXT NOT NULL,
          attempts INTEGER NOT NULL DEFAULT 1,
          rating INTEGER,
          comments TEXT,
          media_id TEXT,
          datetime TEXT NOT NULL,
          category TEXT
        );
        
        PRAGMA journal_mode=WAL;
        `); // Write Ahead Logging, allows concurrency
      }}
    >
      {/* this makes apple's status bar black */}
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}

export default RootLayout;
