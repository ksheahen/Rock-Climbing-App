import {
    Challenge,
    ChallengeInsert,
    ChallengeUpdate,
} from "../types/Challenge.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single challenge by UUID
export const getChallengeById = async (
  challengeId: string,
): Promise<Challenge | null> => {
  const { data, error } = await table("challenge")
    .select("*")
    .eq("challenge_id", challengeId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching challenge:", error);
    return null;
  }

  return data as Challenge;
};

// Insert a new challenge
export const createChallenge = async (
  newChallenge: ChallengeInsert,
): Promise<Challenge | null> => {
  const { data, error } = await table("challenge")
    .insert(newChallenge)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating challenge:", error);
    return null;
  }

  return data as Challenge;
};

// Update a challenge
export const updateChallenge = async (
  challengeId: string,
  updates: ChallengeUpdate,
): Promise<Challenge | null> => {
  const { data, error } = await table("challenge")
    .update(updates)
    .eq("challenge_id", challengeId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating challenge:", error);
    return null;
  }

  return data as Challenge;
};

// Delete a challenge
export const deleteChallenge = async (
  challengeId: string,
): Promise<boolean> => {
  const { error } = await table("challenge")
    .delete()
    .eq("challenge_id", challengeId);

  if (error) {
    console.error("Error deleting challenge:", error);
    return false;
  }

  return true;
};
