// Local climb type matching current log_climb3 SQLite schema
// Using existing schema - will refactor with team later
export interface LocalClimb {
  id: number;
  category: string;
  type: string;
  complete: string;
  attempt: string;
  grade: string;
  rating: number;
  datetime: string;
  description: string;
  media: string;
}

export type LocalClimbInsert = Omit<LocalClimb, "id">;
