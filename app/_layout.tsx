// initialize our database here
// so that all children of the application
// can use the same database.
// we access this database using the sqlite db hook.
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="climb.db"
      onInit={async (db) => {
        await db.execAsync(`
        CREATE TABLE IF NOT EXISTS log_climb3 (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        category TEXT NOT NULL,
        type TEXT NOT NULL,
        complete TEXT NOT NULL,
        attempt TEXT NOT NULL, 
        grade TEXT,
        rating INTEGER,
        datetime TEXT, 
        description TEXT,
        media TEXT
        );
        PRAGMA journal_mode=WAL;
        `); // Write Ahead Logging, allows concurrency
      }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      </Stack>
    </SQLiteProvider>
  );
}

export default RootLayout;
