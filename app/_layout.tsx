import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Button, StatusBar, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // TEMPORARY
  const clearAppData = async () => {
    try {
      await AsyncStorage.clear();
      console.log("App data cleared!");
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      console.log("AsyncStorage contents after clearing:", items);
    } catch (error) {
      console.error("Failed to clear app data:", error);
    }
  };

  // useEffect(() => {
  //   const checkOnboardingStatus = async () => {
  //     try {
  //       const hasSeenOnboarding =
  //         await AsyncStorage.getItem("hasSeenOnboarding");
  //       console.log("hasSeenOnboarding:", hasSeenOnboarding);

  //       if (!hasSeenOnboarding) {
  //         setShowOnboarding(true);
  //       } else {
  //         setShowOnboarding(false);
  //       }
  //     } catch (error) {
  //       console.error("Error checking onboarding status:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   checkOnboardingStatus();
  // }, []);

  // // Shows a loading screen while checking for onboarding status
  // if (isLoading) {
  //   return (
  //     <GestureHandlerRootView
  //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //     >
  //       <Text>Loading...</Text>
  //     </GestureHandlerRootView>
  //   );
  // }

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
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        <Button title="Reset App Data" onPress={clearAppData} />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
