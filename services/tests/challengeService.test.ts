// Run with:
// npx vitest run services/tests/challengeService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createChallenge,
  deleteChallenge,
  getChallengeById,
  updateChallenge,
} from "../challengeService";

let testChallengeId: string;

const testChallengeData = {
  title: "Test Challenge",
  description: "This is a test challenge.",
  start_date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
  end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0], // +7 days
};

describe("Challenge Service Tests", () => {
  // Create a test challenge before all tests
  beforeAll(async () => {
    const challenge = await createChallenge(testChallengeData);
    expect(challenge).toBeDefined();
    testChallengeId = challenge!.challenge_id;
  });

  // Clean up the test challenge after all tests
  afterAll(async () => {
    if (testChallengeId) {
      const deleted = await deleteChallenge(testChallengeId);
      expect(deleted).toBe(true);
    }
  });

  it("should fetch the challenge by ID", async () => {
    const challenge = await getChallengeById(testChallengeId);
    expect(challenge).toBeDefined();
    expect(challenge?.challenge_id).toBe(testChallengeId);
    expect(challenge?.title).toBe(testChallengeData.title);
  });

  it("should update the challenge", async () => {
    const updatedTitle = "Updated Test Challenge";
    const updatedChallenge = await updateChallenge(testChallengeId, {
      title: updatedTitle,
    });
    expect(updatedChallenge).toBeDefined();
    expect(updatedChallenge?.title).toBe(updatedTitle);

    // Optionally fetch again to confirm
    const fetched = await getChallengeById(testChallengeId);
    expect(fetched?.title).toBe(updatedTitle);
  });

  it("should delete a temporary challenge", async () => {
    const tempChallenge = await createChallenge({
      title: "Temp Challenge",
      description: "Temporary challenge",
      start_date: new Date().toISOString().split("T")[0],
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    });
    expect(tempChallenge).toBeDefined();

    const deleted = await deleteChallenge(tempChallenge!.challenge_id);
    expect(deleted).toBe(true);

    const fetched = await getChallengeById(tempChallenge!.challenge_id);
    expect(fetched).toBeNull();
  });
});
