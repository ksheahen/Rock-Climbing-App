import { Session, SessionInsert, SessionUpdate } from "../types/Session.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single session by UUID
export const getSessionById = async (
  sessionId: string,
): Promise<Session | null> => {
  const { data, error } = await table("session")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching session:", error);
    return null;
  }

  return data as Session;
};

// Fetch all sessions for a user
export const getSessionsByUser = async (userId: string): Promise<Session[]> => {
  const { data, error } = await table("session")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user sessions:", error);
    return [];
  }

  return data as Session[];
};

// Insert a new session
export const createSession = async (
  newSession: SessionInsert,
): Promise<Session | null> => {
  const { data, error } = await table("session")
    .insert(newSession)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating session:", error);
    return null;
  }

  return data as Session;
};

// Update a session
export const updateSession = async (
  sessionId: string,
  updates: SessionUpdate,
): Promise<Session | null> => {
  const { data, error } = await table("session")
    .update(updates)
    .eq("session_id", sessionId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating session:", error);
    return null;
  }

  return data as Session;
};

// Delete a session
export const deleteSession = async (sessionId: string): Promise<boolean> => {
  const { error } = await table("session").delete().eq("session_id", sessionId);

  if (error) {
    console.error("Error deleting session:", error);
    return false;
  }

  return true;
};