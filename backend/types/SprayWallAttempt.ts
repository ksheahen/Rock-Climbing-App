export interface SprayWallAttempt {
  attempt_id: string;
  problem_id: string;
  user_id: string;
  attempts?: number;
  completed?: boolean;
}

// Type for inserting a new spray wall attempt
export type SprayWallAttemptInsert = Omit<SprayWallAttempt, "attempt_id">;

// Type for updating an attempt (partial)
export type SprayWallAttemptUpdate = Partial<
  Omit<SprayWallAttempt, "attempt_id">
>;
