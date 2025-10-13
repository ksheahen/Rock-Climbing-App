export interface Session {
  session_id: string;   // UUID
  user_id: string;      // FK to User
  date: string;         // ISO date string
  location?: string;
  source?: string;
}

export type SessionInsert = Omit<Session, 'session_id'>;

// session_id should NOT be required when updating
export type SessionUpdate = Partial<Omit<Session, 'session_id'>>;
