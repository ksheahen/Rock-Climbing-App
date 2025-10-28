import {
    UserAchievement,
    UserAchievementInsert,
    UserAchievementUpdate,
} from "../types/UserAchievement.ts";
import { table } from "./supabaseHelper.ts";

// Create a user achievement
export const createUserAchievement = async (
  newUA: UserAchievementInsert,
): Promise<UserAchievement | null> => {
  const { data, error } = await table("user_achievement")
    .insert(newUA)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating user achievement:", error);
    return null;
  }

  return data as UserAchievement;
};

// Update a user achievement (e.g., earned_date)
export const updateUserAchievement = async (
  userId: string,
  achievementId: string,
  updates: UserAchievementUpdate,
): Promise<UserAchievement | null> => {
  const { data, error } = await table("user_achievement")
    .update(updates)
    .eq("user_id", userId)
    .eq("achievement_id", achievementId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating user achievement:", error);
    return null;
  }

  return data as UserAchievement;
};

// Fetch all achievements by a user
export const getAchievementsByUser = async (
  userId: string,
): Promise<UserAchievement[]> => {
  const { data, error } = await table("user_achievement")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching achievements for user:", error);
    return [];
  }

  return data as UserAchievement[];
};

// Delete a user achievement
export const deleteUserAchievement = async (
  userId: string,
  achievementId: string,
): Promise<boolean> => {
  const { error } = await table("user_achievement")
    .delete()
    .eq("user_id", userId)
    .eq("achievement_id", achievementId);

  if (error) {
    console.error("Error deleting user achievement:", error);
    return false;
  }

  return true;
};
