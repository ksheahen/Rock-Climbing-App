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
        CREATE TABLE IF NOT EXISTS climb (
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
        
        -- Migrate data from old table to new table if it exists
        INSERT OR IGNORE INTO climb (climb_id, type, grade, attempts, rating, comments, datetime, category)
        SELECT 
          'local-' || id as climb_id,
          type,
          grade,
          CAST(attempt AS INTEGER) as attempts,
          rating,
          description as comments,
          datetime,
          category
        FROM log_climb3
        WHERE EXISTS (SELECT 1 FROM sqlite_master WHERE type='table' AND name='log_climb3');
        
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
