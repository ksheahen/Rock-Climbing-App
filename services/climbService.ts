import { createSession } from "@/services/sessionService";
import { supabase } from "@/services/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";
import { Alert } from "react-native";
import uuid from "react-native-uuid";
import { Climb, ClimbInsert, ClimbUpdate } from "../types/Climb.ts";
import { SessionInsert } from "../types/Session.ts";
import { table } from "./supabaseHelper.ts";

export type ClimbInsertExtended = ClimbInsert & {
  acct_id: string;
  session_id: string;
  category: string;
  type: string;
  completed: boolean;
  attempts: number;
  grade: string;
  rating: number | null;
  description: string | null;
  datetime: string | null;
  media: string | null;
};

const LOCAL_CLIMBS_KEY = "@local_climbs";

export const saveClimbLocally = async (climb: ClimbInsert) => {
  const existing = await AsyncStorage.getItem(LOCAL_CLIMBS_KEY);
  const climbs: ClimbInsert[] = existing ? JSON.parse(existing) : [];
  climbs.push(climb);
  await AsyncStorage.setItem(LOCAL_CLIMBS_KEY, JSON.stringify(climbs));
};

export const getClimbById = async (climbId: string): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("climb_id", climbId)
    .maybeSingle();

  if (error) return null;
  return (data as Climb) ?? null;
};

export const getClimbsBySession = async (
  sessionId: string,
): Promise<Climb[]> => {
  const { data, error } = await table("climb")
    .select("*")
    .eq("session_id", sessionId);

  if (error) return [];
  return (data as Climb[]) ?? [];
};

export const createClimb = async (
  newClimb: ClimbInsert,
): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .insert(newClimb)
    .select()
    .maybeSingle();

  if (error) return null;
  if (!data) throw new Error("No data returned");
  return data as Climb;
};

export const updateClimb = async (
  climbId: string,
  updates: ClimbUpdate,
): Promise<Climb | null> => {
  const { data, error } = await table("climb")
    .update(updates)
    .eq("climb_id", climbId)
    .select()
    .maybeSingle();

  if (error) return null;
  return (data as Climb) ?? null;
};

export const deleteClimb = async (climbId: string): Promise<boolean> => {
  const { error } = await table("climb").delete().eq("climb_id", climbId);
  return !error;
};

type LocalPickerMedia = { uri: string; type: "image" | "video" };

type SQLiteClimbRow = {
  id: number;
  uuid: string | null;
  category: string | null;
  type: string | null;
  complete: string | null;
  attempt: string | null;
  grade: string | null;
  rating: number | null;
  datetime: string | null;
  description: string | null;
  media: string | null;
  deleted: number;
  synced: number;
};

function parseCompleted(v: any): boolean {
  const s = String(v ?? "")
    .toLowerCase()
    .trim();
  return s === "yes" || s === "true" || s === "1";
}

function parseLocalMedia(mediaText: string | null): LocalPickerMedia[] {
  if (!mediaText) return [];
  try {
    const parsed = JSON.parse(mediaText);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m) =>
        m &&
        typeof m.uri === "string" &&
        (m.type === "image" || m.type === "video"),
    );
  } catch {
    return [];
  }
}

function guessExt(type: "image" | "video", uri: string) {
  const lower = uri.toLowerCase();
  const match = lower.match(/\.(jpg|jpeg|png|webp|mp4|mov|mkv)$/);
  if (match) return match[1] === "jpeg" ? "jpg" : match[1];
  return type === "image" ? "jpg" : "mp4";
}

function guessContentType(type: "image" | "video", uri: string) {
  const lower = uri.toLowerCase();
  if (type === "image") {
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".webp")) return "image/webp";
    return "image/jpeg";
  }
  if (lower.endsWith(".mov")) return "video/quicktime";
  if (lower.endsWith(".mkv")) return "video/x-matroska";
  return "video/mp4";
}

function buildStoragePath(params: {
  userId: string;
  climbId: string;
  index: number;
  type: "image" | "video";
  uri: string;
}) {
  const ext = guessExt(params.type, params.uri);
  return `${params.userId}/${params.climbId}/${params.index}.${ext}`;
}

async function uploadToStorage(params: {
  localUri: string;
  bucket: string;
  storagePath: string;
  contentType: string;
}) {
  const res = await fetch(params.localUri);
  const arrayBuffer = await res.arrayBuffer();
  const fileData = new Uint8Array(arrayBuffer);

  const { error } = await supabase.storage
    .from(params.bucket)
    .upload(params.storagePath, fileData, {
      contentType: params.contentType,
      upsert: true,
    });

  if (error) throw error;
}

async function ensureMediaRow(params: { file_url: string; type: string }) {
  const { data: inserted, error: insErr } = await table("media")
    .insert({ file_url: params.file_url, type: params.type })
    .select("media_id")
    .maybeSingle();

  if (!insErr && inserted?.media_id) return inserted.media_id as string;

  const { data: existing } = await table("media")
    .select("media_id")
    .eq("file_url", params.file_url)
    .maybeSingle();

  if (!existing?.media_id) throw insErr ?? new Error("Failed to ensure media");
  return existing.media_id as string;
}

async function ensureClimbMediaLink(params: {
  climbId: string;
  mediaId: string;
}) {
  const { error } = await table("climb_media").insert({
    climb_id: params.climbId,
    media_id: params.mediaId,
  });

  if (!error) return;
  if ((error as any)?.code === "23505") return;
  throw error;
}

async function createSessionForSync(userId: string): Promise<string | null> {
  const newSession = await createSession({ user_id: userId } as SessionInsert);
  if (!newSession) return null;
  return newSession.session_id;
}

export const syncLocalClimbsSQLite = async (
  db: ReturnType<typeof useSQLiteContext>,
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert("Sync failed", "No logged-in user found.");
      return;
    }

    const sessionId = await createSessionForSync(user.id);
    if (!sessionId) return;

    const localClimbs = (await db.getAllAsync(
      "SELECT * FROM log_climb5 WHERE synced = 0",
    )) as SQLiteClimbRow[];

    for (const row of localClimbs) {
      if (!row.uuid) {
        const newUuid = uuid.v4().toString();
        row.uuid = newUuid;
        await db.runAsync("UPDATE log_climb5 SET uuid = ? WHERE id = ?", [
          newUuid,
          row.id,
        ]);
      }

      const climbId = row.uuid as string;

      if (row.deleted === 1) {
        await table("climb").delete().eq("climb_id", climbId);
        await db.runAsync("DELETE FROM log_climb5 WHERE uuid = ?", [climbId]);
        continue;
      }

      await table("climb").upsert({
        climb_id: climbId,
        acct_id: user.id,
        session_id: sessionId,
        type: row.type ?? "boulder",
        grade: row.grade || "Unknown",
        attempts: parseInt(row.attempt ?? "0", 10),
        rating: row.rating ?? null,
        description: row.description ?? null,
        datetime:
          row.datetime && row.datetime.trim() !== ""
            ? row.datetime
            : new Date().toISOString(),
        completed: parseCompleted(row.complete),
        category: row.category || "Indoor",
      });

      /* --- 2) MEDIA UPLOAD + LINK --- */
      const mediaItems = parseLocalMedia(row.media);

      for (let i = 0; i < mediaItems.length; i++) {
        const m = mediaItems[i];

        const storagePath = buildStoragePath({
          userId: user.id,
          climbId,
          index: i,
          type: m.type,
          uri: m.uri,
        });

        await uploadToStorage({
          localUri: m.uri,
          bucket: "climb-media",
          storagePath,
          contentType: guessContentType(m.type, m.uri),
        });

        const mediaId = await ensureMediaRow({
          file_url: storagePath,
          type: m.type,
        });

        await ensureClimbMediaLink({ climbId, mediaId });
      }

      await db.runAsync("UPDATE log_climb5 SET synced = 1 WHERE uuid = ?", [
        climbId,
      ]);
    }

    /* --- 3) REMOTE MERGE BACK INTO SQLITE --- */
    const { data: remoteClimbs } = await table("climb")
      .select("*")
      .eq("acct_id", user.id);

    if (remoteClimbs) {
      for (const climb of remoteClimbs) {
        await db.runAsync(
          `INSERT OR REPLACE INTO log_climb5
            (uuid, category, type, complete, attempt, grade, rating, datetime, description, media, synced)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [
            climb.climb_id,
            climb.category || "Indoor",
            climb.type || "boulder",
            climb.completed ? "Yes" : "No",
            climb.attempts?.toString() || "0",
            climb.grade || "Unknown",
            climb.rating ?? 0,
            climb.datetime ?? new Date().toISOString(),
            climb.description || "",
            "",
          ],
        );
      }
    }

    Alert.alert("Sync complete", "Climbs synced successfully.");
  } catch (err) {
    console.error("Sync failed:", err);

    Alert.alert("Sync failed", "Please try again later.");
  }
};
