export interface SprayWallProblem {
  problem_id: string; // UUID
  user_id: string; // FK to User
  holds?: Record<string, any>; // JSONB for hold positions
  assigned_difficulty?: string;
  description?: string;
}

// For inserts, problem_id is not required
export type SprayWallProblemInsert = Omit<SprayWallProblem, "problem_id">;

// For updates, problem_id should not be required
export type SprayWallProblemUpdate = Partial<
  Omit<SprayWallProblem, "problem_id">
>;