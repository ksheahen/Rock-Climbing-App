// Run with:
// npx vitest run services/tests/mediaService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createMedia,
  deleteMedia,
  getMediaById,
  updateMedia,
} from "../mediaService";
import { createUser, deleteUser } from "../userService";

let testUserId: string;
let testMediaId: string;

const testUserData = {
  name: "Test User",
  email: "testuser@example.com",
  password_hash: "password123",
};

describe("Media Service Tests", () => {
  beforeAll(async () => {
    // Create temporary user
    const user = await createUser(testUserData);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.user_id;
  });

  afterAll(async () => {
    // Delete media and user
    if (testMediaId) await deleteMedia(testMediaId);
    if (testUserId) await deleteUser(testUserId);
  });

  it("should create a new media entry", async () => {
    const mediaData = {
      file_url: "https://example.com/media/test_image.jpg",
      type: "image",
    };
    const media = await createMedia(mediaData);
    expect(media).not.toBeNull();
    expect(media?.media_id).toBeDefined();
    testMediaId = media!.media_id;
  });

  it("should fetch media by ID", async () => {
    const media = await getMediaById(testMediaId);
    expect(media).not.toBeNull();
    expect(media?.file_url).toBe("https://example.com/media/test_image.jpg");
  });

  it("should update the media entry", async () => {
    const updates = { type: "video" }; // Using MediaUpdate type
    const updatedMedia = await updateMedia(testMediaId, updates);
    expect(updatedMedia).not.toBeNull();
    expect(updatedMedia?.type).toBe("video");

    // Fetch again to confirm
    const fetched = await getMediaById(testMediaId);
    expect(fetched?.type).toBe("video");
  });

  it("should delete a media entry", async () => {
    const tempMedia = await createMedia({
      file_url: "https://example.com/media/temp_image.jpg",
      type: "image",
    });
    expect(tempMedia).toBeDefined();

    const deleted = await deleteMedia(tempMedia!.media_id);
    expect(deleted).toBe(true);

    const fetched = await getMediaById(tempMedia!.media_id);
    expect(fetched).toBeNull();
  });
});