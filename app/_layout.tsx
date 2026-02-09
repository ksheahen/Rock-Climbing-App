// initialize our database here
// so that all children of the application
// can use the same database.
// we access this database using the sqlite db hook.

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [ShowOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  // TEMPORARY
  const clearAppData = async () => {
    try {
      await AsyncStorage.clear(); // Clear all AsyncStorage data
      // setShowOnboarding(false);
      console.log("App data cleared!");
    } catch (error) {
      console.error("Failed to clear app data:", error);
    }
  };

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const hasSeenOnboarding =
          await AsyncStorage.getItem("hasSeenOnboarding");

        if (!hasSeenOnboarding) {
          setShowOnboarding(true);
        } else {
          setShowOnboarding(false);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkOnboardingStatus();
  }, []);

  // Shows a loading screen while checking for onboarding status
  if (isLoading) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          const columns = await db.getAllAsync(
            "PRAGMA table_info(log_climb5);",
          );
          const existingCols = columns.map((c: any) => c.name);

          // Add uuid column if missing (no UNIQUE here)
          if (!existingCols.includes("uuid")) {
            await db.execAsync(`ALTER TABLE log_climb5 ADD COLUMN uuid TEXT;`);
          }

          // Add deleted column if missing
          if (!existingCols.includes("deleted")) {
            await db.execAsync(
              `ALTER TABLE log_climb5 ADD COLUMN deleted INTEGER DEFAULT 0;`,
            );
          }
        }}
      >
        {/* this makes apple's status bar black */}
        <StatusBar barStyle="dark-content" />
        <Stack screenOptions={{ headerShown: false }}>
          {ShowOnboarding ? (
            <Stack.Screen
              name="(auth)/onboarding"
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          )}
        </Stack>
        {/* TEMPORARY */}
        {/* <Button title="Reset App Data" onPress={clearAppData} /> */}
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
