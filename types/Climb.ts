export interface Climb {
  climb_id: string;
  session_id: string; // FK → session.session_id
  type: string; // 'boulder' | 'route'
  grade: string; // e.g., 'V5' or '5.12a'
  attempts: number;
  rating?: number | null;
  comments?: string | null;
  media_id?: string | null; // FK → media.media_id
}

export type ClimbInsert = Omit<Climb, "climb_id">;
export type ClimbUpdate = Partial<Omit<Climb, "climb_id">>;
