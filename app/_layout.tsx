// initialize our database here
// so that all children of the application
// can use the same database.
// we access this database using the sqlite db hook.

import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="climb.db"
      onInit={async (db) => {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS log_climb5 (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        uuid TEXT UNIQUE,
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        complete TEXT NOT NULL,
        attempt TEXT NOT NULL, 
        grade TEXT,
        rating INTEGER,
        datetime TEXT, 
        description TEXT,
        media TEXT,
	      location TEXT,
        deleted INTEGER DEFAULT 0,
        synced INTEGER DEFAULT 0 
        );
        PRAGMA journal_mode=WAL;
        `); 
       // Check existing columns
          const columns = await db.getAllAsync("PRAGMA table_info(log_climb3);");
          const existingCols = columns.map((c: any) => c.name);

          // Add uuid column if missing (no UNIQUE here)
          if (!existingCols.includes("uuid")) {
            await db.execAsync(`ALTER TABLE log_climb3 ADD COLUMN uuid TEXT;`);
          }

          // Add deleted column if missing
          if (!existingCols.includes("deleted")) {
            await db.execAsync(`ALTER TABLE log_climb3 ADD COLUMN deleted INTEGER DEFAULT 0;`);
          }

          // Add synced column if missing
          if (!existingCols.includes("synced")) {
            await db.execAsync(`ALTER TABLE log_climb3 ADD COLUMN synced INTEGER DEFAULT 0;`);
          }
        }}

      
    >

      {/* this makes apple's status bar black */}
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
