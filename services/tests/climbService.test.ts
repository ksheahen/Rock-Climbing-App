// Run with:
// npx vitest run services/tests/climbService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createClimb,
  deleteClimb,
  getClimbById,
  getClimbsBySession,
  updateClimb,
} from "../climbService";
import { createMedia, deleteMedia } from "../mediaService";
import { createSession, deleteSession } from "../sessionService";
import { createUser, deleteUser } from "../userService";

let testUserId: string;
let testSessionId: string;
let testMediaId: string;
let testClimbId: string;

const testUserData = {
  name: "Climb Test User",
  email: "climbuser@example.com",
  password_hash: "password123",
};

describe("Climb Service Tests", () => {
  beforeAll(async () => {
    // Create temporary user
    const user = await createUser(testUserData);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.user_id;

    // Create temporary session
    const session = await createSession({
      user_id: testUserId,
      date: new Date().toISOString(),
      location: "Indoor",
      source: "Test App",
    });
    if (!session) throw new Error("Failed to create test session");
    testSessionId = session.session_id;

    // Create temporary media
    const media = await createMedia({
      file_url: "https://example.com/media/climb_image.jpg",
      type: "image",
    });
    if (!media) throw new Error("Failed to create test media");
    testMediaId = media.media_id;
  });

  afterAll(async () => {
    // Delete climb, session, media, and user
    if (testClimbId) await deleteClimb(testClimbId);
    if (testSessionId) await deleteSession(testSessionId);
    if (testMediaId) await deleteMedia(testMediaId);
    if (testUserId) await deleteUser(testUserId);
  });

  it("should create a new climb", async () => {
    const climbData = {
      session_id: testSessionId,
      type: "boulder",
      grade: "V5",
      attempts: 3,
      rating: 5,
      comments: "Felt good!",
      media_id: testMediaId,
    };
    const climb = await createClimb(climbData);
    expect(climb).not.toBeNull();
    expect(climb?.climb_id).toBeDefined();
    testClimbId = climb!.climb_id;
  });

  it("should fetch the climb by ID", async () => {
    const climb = await getClimbById(testClimbId);
    expect(climb).not.toBeNull();
    expect(climb?.session_id).toBe(testSessionId);
    expect(climb?.media_id).toBe(testMediaId);
  });

  it("should update the climb", async () => {
    const updates = { grade: "5.11b", attempts: 2 };
    const updated = await updateClimb(testClimbId, updates);
    expect(updated).not.toBeNull();
    expect(updated?.grade).toBe("5.11b");
    expect(updated?.attempts).toBe(2);
  });

  it("should fetch climbs by session", async () => {
    const climbs = await getClimbsBySession(testSessionId);
    expect(climbs.length).toBeGreaterThan(0);
    expect(climbs[0].session_id).toBe(testSessionId);
  });

  it("should delete the climb", async () => {
    const deleted = await deleteClimb(testClimbId);
    expect(deleted).toBe(true);

    const climb = await getClimbById(testClimbId);
    expect(climb).toBeNull();
  });
});