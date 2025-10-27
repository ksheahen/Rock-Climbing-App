import {
  Leaderboard,
  LeaderboardInsert,
  LeaderboardUpdate,
} from "../types/Leaderboard.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single leaderboard entry by ID
export const getLeaderboardById = async (
  leaderboardId: string,
): Promise<Leaderboard | null> => {
  const { data, error } = await table("leaderboard")
    .select("*")
    .eq("leaderboard_id", leaderboardId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching leaderboard:", error);
    return null;
  }

  return data as Leaderboard | null;
};

// Create a new leaderboard entry
export const createLeaderboard = async (
  newLeaderboard: LeaderboardInsert,
): Promise<Leaderboard | null> => {
  const { data, error } = await table("leaderboard")
    .insert(newLeaderboard)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating leaderboard:", error);
    return null;
  }

  if (!data) throw new Error("No data returned when creating leaderboard");

  return data as Leaderboard;
};

// Update a leaderboard entry
export const updateLeaderboard = async (
  leaderboardId: string,
  updates: LeaderboardUpdate,
): Promise<Leaderboard | null> => {
  const { data, error } = await table("leaderboard")
    .update(updates)
    .eq("leaderboard_id", leaderboardId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating leaderboard:", error);
    return null;
  }

  return data as Leaderboard | null;
};

// Delete a leaderboard entry
export const deleteLeaderboard = async (
  leaderboardId: string,
): Promise<boolean> => {
  const { error } = await table("leaderboard")
    .delete()
    .eq("leaderboard_id", leaderboardId);

  if (error) {
    console.error("Error deleting leaderboard:", error);
    return false;
  }

  return true;
};
