import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Button, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DEFAULT_ACHIEVEMENTS } from "@/components/Achievements/achievements";
import {
  evaluateFlashMasterAchievement,
  evaluateHighestGradeAchievement,
} from "@/services/achievementService";
import { supabase } from "@/services/supabaseClient";

function RootLayout() {
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
                
      CREATE TABLE IF NOT EXISTS achievement (
        achievement_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        badge_icon TEXT
      );


      CREATE TABLE IF NOT EXISTS user_achievement (
        user_achievement_id TEXT PRIMARY KEY,
        user_id TEXT,
        achievement_id TEXT NOT NULL,
        earned_at TEXT NOT NULL,
        synced INTEGER DEFAULT 0,
        deleted INTEGER DEFAULT 0
      );

      CREATE UNIQUE INDEX IF NOT EXISTS idx_user_achievement_unique
      ON user_achievement(user_id, achievement_id);

      PRAGMA journal_mode=WAL;
    `);

    const columns = await db.getAllAsync("PRAGMA table_info(log_climb5);");
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

    for (const achievement of DEFAULT_ACHIEVEMENTS) {
      await db.runAsync(
        `INSERT OR IGNORE INTO achievement
         (achievement_id, name, description, badge_icon)
         VALUES (?, ?, ?, ?)`,
        [
          achievement.achievement_id,
          achievement.name,
          achievement.description,
          achievement.badge_icon,
        ],
      );
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    if (user) {
      await evaluateHighestGradeAchievement(db, user.id);
      await evaluateFlashMasterAchievement(db, user.id);
    }
  }}
>
        <StatusBar barStyle="dark-content" />

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(pages)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
        {/* <Button title="Reset App Data" onPress={clearAppData} /> */}
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;
