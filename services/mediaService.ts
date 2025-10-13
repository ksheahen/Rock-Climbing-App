import { Media, MediaInsert, MediaUpdate } from '../types/Media.ts';
import { table } from './supabaseHelper.ts';

// Fetch a single media by UUID
export const getMediaById = async (mediaId: string): Promise<Media | null> => {
  const { data, error } = await table('media')
    .select('*')
    .eq('media_id', mediaId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching media:', error);
    return null;
  }

  return data as Media;
};

// Insert a new media
export const createMedia = async (newMedia: MediaInsert): Promise<Media | null> => {
  const { data, error } = await table('media')
    .insert(newMedia)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating media:', error);
    return null;
  }

  if (!data) throw new Error('No data returned when creating media');

  return data as Media;
};

// Update media
export const updateMedia = async (mediaId: string, updates: MediaUpdate): Promise<Media | null> => {
  const { data, error } = await table('media')
    .update(updates)
    .eq('media_id', mediaId)
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error updating media:', error);
    return null;
  }

  return data as Media;
};

// Delete media
export const deleteMedia = async (mediaId: string): Promise<boolean> => {
  const { error } = await table('media')
    .delete()
    .eq('media_id', mediaId);

  if (error) {
    console.error('Error deleting media:', error);
    return false;
  }

  return true;
};
