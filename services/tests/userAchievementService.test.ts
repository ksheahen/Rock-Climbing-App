// Run with:
// npx vitest run services/tests/userAchievementService.test.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createAchievement, deleteAchievement } from '../achievementService';
import {
  createUserAchievement,
  deleteUserAchievement,
  getAchievementsByUser,
  updateUserAchievement,
} from '../userAchievementService';
import { createUser, deleteUser } from '../userService';

let testUserId: string;
let testAchievementId: string;
let testUserAchievementId: { user_id: string; achievement_id: string };

const testUserData = {
  name: 'Test User',
  email: 'testuser_ua@example.com',
  password_hash: 'password123',
};

const testAchievementData = {
  name: 'Test Achievement',
  description: 'Awarded for testing',
  badge_icon: '🏆',
};

describe('UserAchievement Service Tests', () => {
  beforeAll(async () => {
    const user = await createUser(testUserData);
    if (!user) throw new Error('Failed to create test user');
    testUserId = user.user_id;

    const achievement = await createAchievement(testAchievementData);
    if (!achievement) throw new Error('Failed to create test achievement');
    testAchievementId = achievement.achievement_id;
  });

  afterAll(async () => {
    if (testUserAchievementId) {
      await deleteUserAchievement(testUserAchievementId.user_id, testUserAchievementId.achievement_id);
    }
    if (testAchievementId) await deleteAchievement(testAchievementId);
    if (testUserId) await deleteUser(testUserId);
  });

  it('should create a user achievement', async () => {
    const userAchievementData = { user_id: testUserId, achievement_id: testAchievementId };
    const ua = await createUserAchievement(userAchievementData);
    expect(ua).not.toBeNull();
    expect(ua?.user_id).toBe(testUserId);
    expect(ua?.achievement_id).toBe(testAchievementId);
    expect(ua?.earned_date).toBeDefined();

    testUserAchievementId = { user_id: ua!.user_id, achievement_id: ua!.achievement_id };
  });

  it('should fetch achievements by user', async () => {
    const achievements = await getAchievementsByUser(testUserId);
    expect(achievements.length).toBeGreaterThan(0);
    const found = achievements.find(a => a.achievement_id === testAchievementId);
    expect(found).toBeDefined();
    expect(found?.user_id).toBe(testUserId);
  });

  it('should update the user achievement', async () => {
  const newDate = new Date().toISOString();
  const updated = await updateUserAchievement(testUserId, testAchievementId, { earned_date: newDate });

  expect(updated).not.toBeNull();
  // Convert Supabase returned date to ISO string for consistent comparison
  expect(new Date(updated!.earned_date).toISOString()).toBe(newDate);
});

  it('should delete the user achievement', async () => {
    const deleted = await deleteUserAchievement(testUserId, testAchievementId);
    expect(deleted).toBe(true);

    const achievements = await getAchievementsByUser(testUserId);
    const found = achievements.find(a => a.achievement_id === testAchievementId);
    expect(found).toBeUndefined();
  });
});

