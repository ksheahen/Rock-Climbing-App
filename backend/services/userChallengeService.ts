import {
    UserChallenge,
    UserChallengeInsert,
    UserChallengeUpdate,
} from "../types/UserChallenge.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single user-challenge entry by user_id + challenge_id
export const getUserChallenge = async (
  userId: string,
  challengeId: string,
): Promise<UserChallenge | null> => {
  const { data, error } = await table("user_challenge")
    .select("*")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user challenge:", error);
    return null;
  }

  return data as UserChallenge;
};

// Fetch all challenges for a user
export const getUserChallengesByUser = async (
  userId: string,
): Promise<UserChallenge[]> => {
  const { data, error } = await table("user_challenge")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user challenges:", error);
    return [];
  }

  return data as UserChallenge[];
};

// Insert a new user challenge
export const createUserChallenge = async (
  newUserChallenge: UserChallengeInsert,
): Promise<UserChallenge | null> => {
  const { data, error } = await table("user_challenge")
    .insert(newUserChallenge)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating user challenge:", error);
    return null;
  }

  return data as UserChallenge;
};

// Update a user challenge
export const updateUserChallenge = async (
  userId: string,
  challengeId: string,
  updates: UserChallengeUpdate,
): Promise<UserChallenge | null> => {
  const { data, error } = await table("user_challenge")
    .update(updates)
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating user challenge:", error);
    return null;
  }

  return data as UserChallenge;
};

// Delete a user challenge
export const deleteUserChallenge = async (
  userId: string,
  challengeId: string,
): Promise<boolean> => {
  const { error } = await table("user_challenge")
    .delete()
    .eq("user_id", userId)
    .eq("challenge_id", challengeId);

  if (error) {
    console.error("Error deleting user challenge:", error);
    return false;
  }

  return true;
};
