export interface Leaderboard {
  leaderboard_id: string;
  user_id: string;
  rank?: number;
  score?: number;
}

export type LeaderboardInsert = Omit<Leaderboard, 'leaderboard_id'>;

// New type for updating a leaderboard entry
export type LeaderboardUpdate = Partial<Omit<Leaderboard, 'leaderboard_id'>>;