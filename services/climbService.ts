import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Climb, ClimbInsert, ClimbUpdate } from "../types/Climb.ts";
import { table } from "./supabaseHelper.ts";
import uuid from "react-native-uuid";
import { supabase } from "@/services/supabaseClient";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useState } from "react";
import { getSessionsByUser, createSession } from "@/services/sessionService";
import { getUserById } from "@/services/userService";
import type { User } from "@/types/User";
import { Session, SessionInsert, SessionUpdate } from "../types/Session.ts";


export type ClimbInsertExtended = ClimbInsert & {
  acct_id: string;
  session_id: string;
  category: string;
  type: string;
  completed: boolean;
  attempts: number;
  difficulty: string;  
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

export const getClimbsBySession = async (sessionId: string): Promise<Climb[]> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("session_id", sessionId);
  if (error) {
    console.error("[getClimbsBySession] Error fetching climbs:", error);
    return [];
  }
  return data as Climb[];
};

export const createClimb = async (newClimb: ClimbInsert): Promise<Climb | null> => {
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

export const updateClimb = async (climbId: string, updates: ClimbUpdate): Promise<Climb | null> => {
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

export const syncLocalClimbsSQLite = async (db: ReturnType<typeof useSQLiteContext>) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      Alert.alert("Sync failed", "No logged-in user found.");
      return;
    }

    const localClimbsRaw = await db.getAllAsync("SELECT * FROM log_climb3");
    const localClimbs = localClimbsRaw as SQLiteClimbRow[];

    if (localClimbs.length === 0) {
      Alert.alert("Nothing to sync", "No offline climbs found.");
      return;
    }

    console.log(`[syncLocalClimbsSQLite] Found ${localClimbs.length} offline climbs`);

    const sessionId = await createSessionForSync(user.id);
    if (!sessionId) return;

    console.log(`[syncLocalClimbsSQLite] Using session_id: ${sessionId}`);

    for (const row of localClimbs) {
      const climbToInsert: ClimbInsertExtended = {
        acct_id: user.id,
        session_id: sessionId,
        category: row.category || "Uncategorized",
        type: row.type || "boulder",
        completed: row.completed === "Yes",
        attempts: parseInt(row.attempts || "0", 10),
        difficulty: row.grade || "Unknown",
        rating: row.rating ?? null,
        description: row.description || null,
        datetime: row.datetime || new Date().toISOString(),
        media: row.media || null,
      };

      const { data, error } = await table("climb")
        .insert(climbToInsert)
        .select()
        .maybeSingle();

      if (error) {
        console.error("[syncLocalClimbsSQLite] Failed to sync climb:", error);
      } else {
        console.log("[syncLocalClimbsSQLite] Synced climb:", data);
      }
    }

    Alert.alert("Sync complete", `Synced ${localClimbs.length} climbs successfully.`);

  } catch (err) {
    console.error("[syncLocalClimbsSQLite] Sync failed:", err);
    Alert.alert("Sync failed", "Please try again later.");
  }
};