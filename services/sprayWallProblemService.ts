import {
    SprayWallProblem,
    SprayWallProblemInsert,
    SprayWallProblemUpdate,
} from "../types/SprayWallProblem.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single problem by UUID
export const getSprayWallProblemById = async (
  problemId: string,
): Promise<SprayWallProblem | null> => {
  const { data, error } = await table("spraywallproblem")
    .select("*")
    .eq("problem_id", problemId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching spray wall problem:", error);
    return null;
  }

  return data as SprayWallProblem;
};

// Fetch all problems for a user
export const getSprayWallProblemsByUser = async (
  userId: string,
): Promise<SprayWallProblem[]> => {
  const { data, error } = await table("spraywallproblem")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching problems for user:", error);
    return [];
  }

  return data as SprayWallProblem[];
};

// Insert a new problem
export const createSprayWallProblem = async (
  newProblem: SprayWallProblemInsert,
): Promise<SprayWallProblem | null> => {
  const { data, error } = await table("spraywallproblem")
    .insert(newProblem)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating spray wall problem:", error);
    return null;
  }

  return data as SprayWallProblem;
};

// Update a problem
export const updateSprayWallProblem = async (
  problemId: string,
  updates: SprayWallProblemUpdate,
): Promise<SprayWallProblem | null> => {
  const { data, error } = await table("spraywallproblem")
    .update(updates)
    .eq("problem_id", problemId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating spray wall problem:", error);
    return null;
  }

  return data as SprayWallProblem;
};

// Delete a problem
export const deleteSprayWallProblem = async (
  problemId: string,
): Promise<boolean> => {
  const { error } = await table("spraywallproblem")
    .delete()
    .eq("problem_id", problemId);

  if (error) {
    console.error("Error deleting spray wall problem:", error);
    return false;
  }

  return true;
};
