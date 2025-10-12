import { supabase } from './supabaseClient.ts';

export const table = (tableName: string) => supabase.from(tableName);
