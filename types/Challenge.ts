// Full Challenge object (matches DB)
export interface Challenge {
  challenge_id: string;
  title: string;
  description?: string;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
}

// Type for inserting a new challenge
export type ChallengeInsert = Omit<Challenge, 'challenge_id'>;

// Type for updating a challenge
export interface ChallengeUpdate {
  title?: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

