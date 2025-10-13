// Run with:
// npx vitest run services/tests/achievementService.test.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  createAchievement,
  deleteAchievement,
  getAchievementById,
  updateAchievement,
} from '../achievementService';

let testAchievementId: string;

const testAchievementData = {
  name: 'Test Achievement',
  description: 'This is a test achievement',
  badge_icon: 'https://example.com/badge.png',
};

describe('Achievement Service Tests', () => {
  // Create a test achievement before all tests
  beforeAll(async () => {
    const achievement = await createAchievement(testAchievementData);
    expect(achievement).toBeDefined();
    testAchievementId = achievement!.achievement_id;
  });

  // Clean up the test achievement after all tests
  afterAll(async () => {
    if (testAchievementId) {
      const deleted = await deleteAchievement(testAchievementId);
      expect(deleted).toBe(true);
    }
  });

  it('should fetch the achievement by ID', async () => {
    const achievement = await getAchievementById(testAchievementId);
    expect(achievement).toBeDefined();
    expect(achievement?.achievement_id).toBe(testAchievementId);
    expect(achievement?.name).toBe(testAchievementData.name);
  });

  it('should update the achievement', async () => {
    const updatedName = 'Updated Test Achievement';
    const updatedAchievement = await updateAchievement(testAchievementId, { name: updatedName });
    expect(updatedAchievement).toBeDefined();
    expect(updatedAchievement?.name).toBe(updatedName);

    // Optionally fetch again to confirm
    const fetched = await getAchievementById(testAchievementId);
    expect(fetched?.name).toBe(updatedName);
  });

  it('should delete a temporary achievement', async () => {
    // Create a temporary achievement to delete
    const tempAchievement = await createAchievement({
      name: 'Temp Achievement',
      description: 'Temporary achievement',
      badge_icon: 'https://example.com/temp.png',
    });
    expect(tempAchievement).toBeDefined();

    const deleted = await deleteAchievement(tempAchievement!.achievement_id);
    expect(deleted).toBe(true);

    const fetched = await getAchievementById(tempAchievement!.achievement_id);
    expect(fetched).toBeNull();
  });
});
