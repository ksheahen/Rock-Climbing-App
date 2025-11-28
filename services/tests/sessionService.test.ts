// Run with:
// npx vitest run services/tests/sessionService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createMedia, deleteMedia } from "../mediaService";
import {
  createSession,
  deleteSession,
  getSessionById,
  getSessionsByUser,
  updateSession,
} from "../sessionService";
import { createUser, deleteUser } from "../userService";

let testUserId: string;
let testSessionId: string;
let testMediaId: string;

const testUserData = {
  name: "Test User",
  email: "testuser@example.com",
  password_hash: "password123",
};

describe("Session Service Tests", () => {
  beforeAll(async () => {
    // Create temporary user
    const user = await createUser(testUserData);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.user_id;

    // Optionally create temporary media
    const media = await createMedia({
      file_url: "https://example.com/media/session_image.jpg",
      type: "image",
    });
    if (!media) throw new Error("Failed to create test media");
    testMediaId = media.media_id;
  });

  afterAll(async () => {
    // Delete session, media, and user
    if (testSessionId) await deleteSession(testSessionId);
    if (testMediaId) await deleteMedia(testMediaId);
    if (testUserId) await deleteUser(testUserId);
  });

  it("should create a new session", async () => {
    const sessionData = {
      user_id: testUserId,
      date: new Date().toISOString(),
      location: "Indoor",
      source: "Test App",
    };
    const session = await createSession(sessionData);
    expect(session).not.toBeNull();
    expect(session?.session_id).toBeDefined();
    testSessionId = session!.session_id;
  });

  it("should fetch the session by ID", async () => {
    const session = await getSessionById(testSessionId);
    expect(session).not.toBeNull();
    expect(session?.user_id).toBe(testUserId);
  });

  it("should update the session", async () => {
    const updates = { location: "Outdoor", source: "Updated App" };
    const updated = await updateSession(testSessionId, updates);
    expect(updated).not.toBeNull();
    expect(updated?.location).toBe("Outdoor");
    expect(updated?.source).toBe("Updated App");
  });

  it("should fetch sessions by user", async () => {
    const sessions = await getSessionsByUser(testUserId);
    expect(sessions.length).toBeGreaterThan(0);
    expect(sessions[0].user_id).toBe(testUserId);
  });

  it("should delete the session", async () => {
    const deleted = await deleteSession(testSessionId);
    expect(deleted).toBe(true);

    const session = await getSessionById(testSessionId);
    expect(session).toBeNull();
  });
});