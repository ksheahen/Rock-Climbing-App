import {
    Achievement,
    AchievementInsert,
    AchievementUpdate,
} from "../types/Achievement.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single achievement by UUID
export const getAchievementById = async (
  achievementId: string,
): Promise<Achievement | null> => {
  const { data, error } = await table("achievement")
    .select("*")
    .eq("achievement_id", achievementId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching achievement:", error);
    return null;
  }

  return data as Achievement;
};

// Insert a new achievement
export const createAchievement = async (
  newAchievement: AchievementInsert,
): Promise<Achievement | null> => {
  const { data, error } = await table("achievement")
    .insert(newAchievement)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating achievement:", error);
    return null;
  }

  return data as Achievement;
};

// Update an achievement
export const updateAchievement = async (
  achievementId: string,
  updates: AchievementUpdate,
): Promise<Achievement | null> => {
  const { data, error } = await table("achievement")
    .update(updates)
    .eq("achievement_id", achievementId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating achievement:", error);
    return null;
  }

  return data as Achievement;
};

// Delete an achievement
export const deleteAchievement = async (
  achievementId: string,
): Promise<boolean> => {
  const { error } = await table("achievement")
    .delete()
    .eq("achievement_id", achievementId);

  if (error) {
    console.error("Error deleting achievement:", error);
    return false;
  }

  return true;
};