import { Climb, ClimbInsert, ClimbUpdate } from "../types/Climb.ts";
import { table } from "./supabaseHelper.ts";

// Fetch a single climb by ID
export const getClimbById = async (climbId: string): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("climb_id", climbId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching climb:", error);
    return null;
  }

  return data as Climb | null;
};

// Fetch all climbs for a specific session
export const getClimbsBySession = async (
  sessionId: string,
): Promise<Climb[]> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("session_id", sessionId);

  if (error) {
    console.error("Error fetching climbs by session:", error);
    return [];
  }

  return data as Climb[];
};

// Create a new climb
export const createClimb = async (
  newClimb: ClimbInsert,
): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .insert(newClimb)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating climb:", error);
    return null;
  }

  if (!data) {
    throw new Error("No data returned when creating climb");
  }

  return data as Climb;
};

// Update a climb
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
    console.error("Error updating climb:", error);
    return null;
  }

  return data as Climb | null;
};

// Delete a climb
export const deleteClimb = async (climbId: string): Promise<boolean> => {
  const { error } = await table("climb").delete().eq("climb_id", climbId);

  if (error) {
    console.error("Error deleting climb:", error);
    return false;
  }

  return true;
};
