// Full User object (matches DB)
export interface User {
  user_id: string;
  name: string;
  email: string;
  password_hash: string;
  profile_info?: Record<string, any>; // JSONB
  fitness_watch_id?: string;
}

// Type for inserting a new user
export interface UserInsert {
  name: string;
  email: string;
  password_hash: string;
  profile_info?: Record<string, any>;
  fitness_watch_id?: string;
}

// Type for updating a user
export interface UserUpdate {
  name?: string;
  email?: string;
  password_hash?: string;
  profile_info?: Record<string, any>;
  fitness_watch_id?: string;
}
