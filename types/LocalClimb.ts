export interface LocalClimb {
  id: number;
  uuid?: string;
  category: string;
  type: string;
  complete: string;
  attempt: string;
  grade: string;
  rating: number;
  datetime: string;
  description: string;
  media: string;
  location?: string;
  deleted?: number;
  synced?: number;
}

export type LocalClimbInsert = Omit<LocalClimb, "id">;
