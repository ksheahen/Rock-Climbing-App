import { createSession } from "@/services/sessionService";
import { supabase } from "@/services/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { Climb, ClimbInsert, ClimbUpdate } from "../types/Climb.ts";
import { SessionInsert } from "../types/Session.ts";
import { table } from "./supabaseHelper.ts";

export type ClimbInsertExtended = ClimbInsert & {
  acct_id: string;
  session_id: string;
  category: string;
  type: string;
  completed: boolean;
  attempts: number;
  grade: string;
  rating: number | null;
  description: string | null;
  datetime: string | null;
  media: string | null;
};

type SQLiteClimbRow = {
  id: number;
  category: string;
  type: string;
  completed: string;
  attempts: string;
  grade: string;
  rating: number;
  datetime: string;
  description: string;
  media: string;
  session_id?: string;
};

export const getClimbById = async (climbId: string): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("climb_id", climbId)
    .maybeSingle();
  if (error) {
    console.error("[getClimbById] Error fetching climb:", error);
    return null;
  }
  return data as Climb | null;
};

export const getClimbsBySession = async (
  sessionId: string,
): Promise<Climb[]> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("session_id", sessionId);
  if (error) {
    console.error("[getClimbsBySession] Error fetching climbs:", error);
    return [];
  }
  return data as Climb[];
};

export const createClimb = async (
  newClimb: ClimbInsert,
): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .insert(newClimb)
    .select()
    .maybeSingle();
  if (error) {
    console.error("[createClimb] Error creating climb:", error);
    return null;
  }
  if (!data) throw new Error("[createClimb] No data returned");
  return data as Climb;
};

export const updateClimb = async (
  climbId: string,
  updates: ClimbUpdate,
): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .update(updates)
    .eq("climb_id", climbId)
    .select()
    .maybeSingle();
  if (error) {
    console.error("[updateClimb] Error updating climb:", error);
    return null;
  }
  return data as Climb | null;
};

export const deleteClimb = async (climbId: string): Promise<boolean> => {
  const { error } = await table("climb").delete().eq("climb_id", climbId);
  if (error) {
    console.error("[deleteClimb] Error deleting climb:", error);
    return false;
  }
  return true;
};

const LOCAL_CLIMBS_KEY = "@local_climbs";

export const saveClimbLocally = async (climb: ClimbInsert) => {
  console.log("[saveClimbLocally] Storing climb locally:", climb);
  const existing = await AsyncStorage.getItem(LOCAL_CLIMBS_KEY);
  const climbs: ClimbInsert[] = existing ? JSON.parse(existing) : [];
  climbs.push(climb);
  await AsyncStorage.setItem(LOCAL_CLIMBS_KEY, JSON.stringify(climbs));
};

async function createSessionForSync(userId: string): Promise<string | null> {
  const newSession = await createSession({
    user_id: userId,
  } as SessionInsert);

  if (!newSession) {
    Alert.alert("Sync failed", "Could not create session for syncing climbs.");
    return null;
  }

  return newSession.session_id;
}

export const syncLocalClimbsSQLite = async (
  db: ReturnType<typeof useSQLiteContext>,
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Sync failed", "No logged-in user found.");
      return;
    }

    // Only fetch unsynced climbs
    const localClimbsRaw = await db.getAllAsync(
      "SELECT * FROM log_climb5 WHERE synced = 0",
    );

    if (localClimbsRaw.length === 0) {
      Alert.alert("Nothing to sync", "All climbs are already synced.");
      return;
    }

    const sessionId = await createSessionForSync(user.id);
    if (!sessionId) return;

    for (const row of localClimbsRaw as any[]) {
      // Generate UUID if missing
      if (!row.uuid) {
        row.uuid = uuid.v4().toString();
        await db.runAsync("UPDATE log_climb5 SET uuid = ? WHERE id = ?", [
          row.uuid,
          row.id,
        ]);
      }

      // Handle deletions
      if (row.deleted === 1) {
        await table("climb").delete().eq("climb_id", row.uuid);
        await db.runAsync("DELETE FROM log_climb5 WHERE uuid = ?", [row.uuid]);
        continue;
      }

      // Upsert into Supabase
      const { error } = await table("climb").upsert({
        climb_id: row.uuid,
        acct_id: user.id,
        session_id: sessionId,
        type: row.type || "boulder",
        grade: row.grade || "Unknown",
        attempts: parseInt(row.attempt || "0", 10),
        rating: row.rating ?? null,
        description: row.description || null,
        datetime: row.datetime || null,
        media: row.media || null,
        completed: row.complete === "Yes",
        category: row.category || "Indoor",
      });

      if (!error) {
        await db.runAsync("UPDATE log_climb5 SET synced = 1 WHERE uuid = ?", [
          row.uuid,
        ]);
      } else {
        console.error("[syncLocalClimbsSQLite] Upsert failed:", error);
      }
    }

    Alert.alert("Sync complete", "Offline climbs synced successfully.");
  } catch (err) {
    console.error("[syncLocalClimbsSQLite] Sync failed:", err);
    Alert.alert("Sync failed", "Please try again later.");
  }
};
