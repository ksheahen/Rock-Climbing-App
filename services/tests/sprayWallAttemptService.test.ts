// Run with:
// npx vitest run services/tests/sprayWallAttemptService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createSprayWallAttempt,
  deleteSprayWallAttempt,
  getSprayWallAttemptById,
  getSprayWallAttemptsByUser,
  updateSprayWallAttempt,
} from "../sprayWallAttemptService";
import {
  createSprayWallProblem,
  deleteSprayWallProblem,
} from "../sprayWallProblemService";
import { createUser, deleteUser } from "../userService";

let testUserId: string;
let testProblemId: string;
let testAttemptId: string;

const testUserData = {
  name: "Test User",
  email: "sprayattempt@example.com",
  password_hash: "password123",
};

describe("SprayWallAttempt Service Tests", () => {
  beforeAll(async () => {
    // Create temporary user
    const user = await createUser(testUserData);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.user_id;

    // Create a temporary spray wall problem properly
    const problemData = {
      user_id: testUserId,
      holds: { start: ["A1"], finish: ["B2"], moves: ["A1->B2"] },
      assigned_difficulty: "V3",
      description: "Test problem description",
    };
    const problem = await createSprayWallProblem(problemData);
    if (!problem) throw new Error("Failed to create test spray wall problem");
    testProblemId = problem.problem_id;
  });

  afterAll(async () => {
    // Delete attempt, problem, and user
    if (testAttemptId) await deleteSprayWallAttempt(testAttemptId);
    if (testProblemId) await deleteSprayWallProblem(testProblemId);
    if (testUserId) await deleteUser(testUserId);
  });

  it("should create a new spray wall attempt", async () => {
    const attemptData = {
      user_id: testUserId,
      problem_id: testProblemId,
      attempts: 1,
      completed: false,
    };
    const attempt = await createSprayWallAttempt(attemptData);
    expect(attempt).not.toBeNull();
    expect(attempt?.attempt_id).toBeDefined();
    testAttemptId = attempt!.attempt_id;
  });

  it("should fetch the attempt by ID", async () => {
    const attempt = await getSprayWallAttemptById(testAttemptId);
    expect(attempt).not.toBeNull();
    expect(attempt?.user_id).toBe(testUserId);
    expect(attempt?.problem_id).toBe(testProblemId);
  });

  it("should update the spray wall attempt", async () => {
    const updates = { attempts: 2, completed: true };
    const updated = await updateSprayWallAttempt(testAttemptId, updates);
    expect(updated).not.toBeNull();
    expect(updated?.attempts).toBe(2);
    expect(updated?.completed).toBe(true);
  });

  it("should fetch attempts by user", async () => {
    const attempts = await getSprayWallAttemptsByUser(testUserId);
    expect(attempts.length).toBeGreaterThan(0);
    expect(attempts[0].user_id).toBe(testUserId);
  });

  it("should delete the spray wall attempt", async () => {
    const deleted = await deleteSprayWallAttempt(testAttemptId);
    expect(deleted).toBe(true);

    const attempt = await getSprayWallAttemptById(testAttemptId);
    expect(attempt).toBeNull();
    testAttemptId = ""; // mark as deleted
  });
});