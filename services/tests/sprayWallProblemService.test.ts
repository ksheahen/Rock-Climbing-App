// Run with:
// npx vitest run services/tests/sprayWallProblemService.test.ts

import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createSprayWallProblem,
  deleteSprayWallProblem,
  getSprayWallProblemById,
  getSprayWallProblemsByUser,
  updateSprayWallProblem,
} from "../sprayWallProblemService";
import { createUser, deleteUser } from "../userService";

let testUserId: string;
let testProblemId: string;

const testUserData = {
  name: "Test User",
  email: "testuser_problems@example.com",
  password_hash: "password123",
};

describe("SprayWallProblem Service Tests", () => {
  beforeAll(async () => {
    // Create temporary user
    const user = await createUser(testUserData);
    if (!user) throw new Error("Failed to create test user");
    testUserId = user.user_id;
  });

  afterAll(async () => {
    // Delete problem and user
    if (testProblemId) await deleteSprayWallProblem(testProblemId);
    if (testUserId) await deleteUser(testUserId);
  });

  it("should create a new spray wall problem", async () => {
    const problemData = {
      user_id: testUserId,
      holds: { start: ["A1"], finish: ["B2"], moves: ["A1->B2"] },
      assigned_difficulty: "V3",
      description: "Test problem description",
    };
    const problem = await createSprayWallProblem(problemData);
    expect(problem).not.toBeNull();
    expect(problem?.problem_id).toBeDefined();
    testProblemId = problem!.problem_id;
  });

  it("should fetch the problem by ID", async () => {
    const problem = await getSprayWallProblemById(testProblemId);
    expect(problem).not.toBeNull();
    expect(problem?.user_id).toBe(testUserId);
    expect(problem?.assigned_difficulty).toBe("V3");
  });

  it("should update the problem", async () => {
    const updates = {
      assigned_difficulty: "V4",
      description: "Updated description",
    };
    const updated = await updateSprayWallProblem(testProblemId, updates);
    expect(updated).not.toBeNull();
    expect(updated?.assigned_difficulty).toBe("V4");
    expect(updated?.description).toBe("Updated description");
  });

  it("should fetch problems by user", async () => {
    const problems = await getSprayWallProblemsByUser(testUserId);
    expect(problems.length).toBeGreaterThan(0);
    expect(problems[0].user_id).toBe(testUserId);
  });

  it("should delete the problem", async () => {
    const deleted = await deleteSprayWallProblem(testProblemId);
    expect(deleted).toBe(true);

    const problem = await getSprayWallProblemById(testProblemId);
    expect(problem).toBeNull();
  });
});