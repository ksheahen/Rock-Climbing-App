import {
  SprayWallAttempt,
  SprayWallAttemptInsert,
  SprayWallAttemptUpdate,
} from "../types/SprayWallAttempt.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single spray wall attempt by ID
export const getSprayWallAttemptById = async (
  attemptId: string,
): Promise<SprayWallAttempt | null> => {
  const { data, error } = await table("spraywallattempt")
    .select("*")
    .eq("attempt_id", attemptId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching spray wall attempt:", error);
    return null;
  }

  return data as SprayWallAttempt | null;
};

// Create a new spray wall attempt
export const createSprayWallAttempt = async (
  newAttempt: SprayWallAttemptInsert,
): Promise<SprayWallAttempt | null> => {
  const { data, error } = await table("spraywallattempt")
    .insert(newAttempt)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating spray wall attempt:", error);
    return null;
  }

  return data as SprayWallAttempt | null;
};

// Update an attempt
export const updateSprayWallAttempt = async (
  attemptId: string,
  updates: SprayWallAttemptUpdate,
): Promise<SprayWallAttempt | null> => {
  const { data, error } = await table("spraywallattempt")
    .update(updates)
    .eq("attempt_id", attemptId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating spray wall attempt:", error);
    return null;
  }

  return data as SprayWallAttempt | null;
};

// Delete an attempt
export const deleteSprayWallAttempt = async (
  attemptId: string,
): Promise<boolean> => {
  const { error } = await table("spraywallattempt")
    .delete()
    .eq("attempt_id", attemptId);

  if (error) {
    console.error("Error deleting spray wall attempt:", error);
    return false;
  }

  return true;
};

// Fetch all attempts for a user
export const getSprayWallAttemptsByUser = async (
  userId: string,
): Promise<SprayWallAttempt[]> => {
  const { data, error } = await table("spraywallattempt")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user spray wall attempts:", error);
    return [];
  }

  return data as SprayWallAttempt[];
};