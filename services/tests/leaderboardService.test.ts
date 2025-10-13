// Run with:
// npx vitest run services/tests/leaderboardService.test.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createLeaderboard, deleteLeaderboard, getLeaderboardById, updateLeaderboard } from '../leaderboardService';
import { createUser, deleteUser } from '../userService';

let testUserId: string;
let testLeaderboardId: string;

const testUserData = {
  name: 'Test User',
  email: `testuser${Date.now()}@example.com`,
  password_hash: 'password123',
};

describe('Leaderboard Service Tests', () => {
  beforeAll(async () => {
    // Create a temporary user for the leaderboard
    const user = await createUser(testUserData);
    if (!user) throw new Error('Failed to create test user');
    testUserId = user.user_id;

    const leaderboard = await createLeaderboard({
      user_id: testUserId,
      rank: 1,
      score: 100,
    });
    expect(leaderboard).toBeDefined();
    testLeaderboardId = leaderboard!.leaderboard_id;
  });

  afterAll(async () => {
    if (testLeaderboardId) {
      const deletedLeaderboard = await deleteLeaderboard(testLeaderboardId);
      expect(deletedLeaderboard).toBe(true);
    }
    if (testUserId) {
      const deletedUser = await deleteUser(testUserId);
      expect(deletedUser).toBe(true);
    }
  });

  it('should fetch the leaderboard by ID', async () => {
    const leaderboard = await getLeaderboardById(testLeaderboardId);
    expect(leaderboard).toBeDefined();
    expect(leaderboard?.leaderboard_id).toBe(testLeaderboardId);
    expect(leaderboard?.score).toBe(100);
  });

  it('should update the leaderboard', async () => {
    const updatedScore = 200;
    const updatedLeaderboard = await updateLeaderboard(testLeaderboardId, { score: updatedScore });
    expect(updatedLeaderboard).toBeDefined();
    expect(updatedLeaderboard?.score).toBe(updatedScore);

    const fetched = await getLeaderboardById(testLeaderboardId);
    expect(fetched?.score).toBe(updatedScore);
  });

  it('should delete a temporary leaderboard', async () => {
    const tempLeaderboard = await createLeaderboard({ user_id: testUserId, score: 50 });
    expect(tempLeaderboard).toBeDefined();

    const deleted = await deleteLeaderboard(tempLeaderboard!.leaderboard_id);
    expect(deleted).toBe(true);

    const fetched = await getLeaderboardById(tempLeaderboard!.leaderboard_id);
    expect(fetched).toBeNull();
  });
});
