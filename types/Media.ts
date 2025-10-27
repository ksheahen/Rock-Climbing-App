export interface Media {
  media_id: string;
  file_url: string;
  type?: string;
  uploaded_at?: string;
}

export type MediaInsert = Omit<Media, "media_id" | "uploaded_at">;

// New type for updating media
export type MediaUpdate = Partial<MediaInsert>;
