export interface UserChallenge {
  user_id: string;
  challenge_id: string;
  progress?: number;
  status?: string;
}

export type UserChallengeInsert = Omit<UserChallenge, "progress" | "status">;

// For updates: progress and status are optional
export type UserChallengeUpdate = Partial<
  Omit<UserChallenge, "user_id" | "challenge_id">
>;
