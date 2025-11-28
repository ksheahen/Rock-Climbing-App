import { User, UserInsert, UserUpdate } from "../types/User.ts";
import { table } from "./supabaseHelper.ts";

//Fetch a single user by UUID
export const getUserById = async (userId: string): Promise<User | null> => {
  const { data, error } = await table("user")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data as User;
};

//Insert a new user
export const createUser = async (newUser: UserInsert): Promise<User | null> => {
  const { data, error } = await table("user")
    .insert(newUser)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error creating user:", error);
    return null;
  }

  if (!data) {
    throw new Error("No data returned when creating user");
  }

  return data as User;
};

// Update a user
export const updateUser = async (
  userId: string,
  updates: UserUpdate,
): Promise<User | null> => {
  const { data, error } = await table("user")
    .update(updates)
    .eq("user_id", userId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }

  return data as User;
};

// Delete a user
export const deleteUser = async (userId: string): Promise<boolean> => {
  const { error } = await table("user").delete().eq("user_id", userId);

  if (error) {
    console.error("Error deleting user:", error);
    return false;
  }

  return true;
};