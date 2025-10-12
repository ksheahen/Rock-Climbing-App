// Run with:
// npx vitest run services/tests/userChallengesService.test.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createChallenge, deleteChallenge } from '../challengeService.ts'; // assuming challengeService exists
import {
    createUserChallenge,
    deleteUserChallenge,
    getUserChallenge,
    getUserChallengesByUser,
    updateUserChallenge,
} from '../userChallengeService.ts';
import { createUser, deleteUser } from '../userService.ts';

let testUserId: string;
let testChallengeId: string;

describe('UserChallenge Service Tests', () => {
  beforeAll(async () => {
  const user = await createUser({
    name: 'Test User',
    email: `user${Date.now()}@example.com`,
    password_hash: 'hashedpassword',
  });
  if (!user) throw new Error('Failed to create test user');
  testUserId = user.user_id;

  const challenge = await createChallenge({
    title: 'Test Challenge',
    description: 'This is a test challenge.',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  if (!challenge) throw new Error('Failed to create test challenge');
  testChallengeId = challenge.challenge_id;
});

  afterAll(async () => {
    if (testUserId && testChallengeId) {
      await deleteUserChallenge(testUserId, testChallengeId);
    }
    if (testChallengeId) await deleteChallenge(testChallengeId);
    if (testUserId) await deleteUser(testUserId);
  });

  it('should create a new user challenge', async () => {
    const uc = await createUserChallenge({
      user_id: testUserId,
      challenge_id: testChallengeId,
    });
    expect(uc).not.toBeNull();
    expect(uc?.user_id).toBe(testUserId);
    expect(uc?.challenge_id).toBe(testChallengeId);
    expect(uc?.progress).toBe(0);
    expect(uc?.status).toBe('in progress');
  });

  it('should fetch the user challenge', async () => {
    const uc = await getUserChallenge(testUserId, testChallengeId);
    expect(uc).not.toBeNull();
    expect(uc?.user_id).toBe(testUserId);
  });

  it('should fetch all challenges by user', async () => {
    const ucs = await getUserChallengesByUser(testUserId);
    expect(ucs.length).toBeGreaterThan(0);
    expect(ucs[0].user_id).toBe(testUserId);
  });

  it('should update the user challenge', async () => {
    const updated = await updateUserChallenge(testUserId, testChallengeId, {
      progress: 50,
      status: 'complete',
    });
    expect(updated).not.toBeNull();
    expect(updated?.progress).toBe(50);
    expect(updated?.status).toBe('complete');
  });

  it('should delete the user challenge', async () => {
    const deleted = await deleteUserChallenge(testUserId, testChallengeId);
    expect(deleted).toBe(true);

    const uc = await getUserChallenge(testUserId, testChallengeId);
    expect(uc).toBeNull();
  });
});
