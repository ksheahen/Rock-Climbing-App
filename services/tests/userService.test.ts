// Run with:
// npx vitest run services/tests/userService.test.ts

import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createUser, deleteUser, getUserById, updateUser } from '../userService.ts';

let testUserId: string;

const testUserData = {
  name: 'Test User',
  email: `test${Date.now()}@example.com`,
  password_hash: 'hashedpassword123',
  profile_info: {},
};

describe('User Service Tests', () => {
  // Create a test user before all tests
  beforeAll(async () => {
    const user = await createUser(testUserData);
    expect(user).not.toBeNull();
    testUserId = user!.user_id;
  });

  // Clean up the test user after all tests
  afterAll(async () => {
    if (testUserId) {
      const deleted = await deleteUser(testUserId);
      expect(deleted).toBe(true);
    }
  });

  it('should fetch the user by ID', async () => {
    const user = await getUserById(testUserId);
    expect(user).not.toBeNull();
    expect(user?.user_id).toBe(testUserId);
    expect(user?.name).toBe(testUserData.name);
  });

  it('should update the user', async () => {
    const updatedName = 'Updated Test User';
    const updatedUser = await updateUser(testUserId, { name: updatedName });
    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.name).toBe(updatedName);

    // Optionally fetch again to confirm
    const fetchedUser = await getUserById(testUserId);
    expect(fetchedUser?.name).toBe(updatedName);
  });

  it('should delete the user', async () => {
    // Create a temporary user to delete (we don't delete the main testUser here)
    const tempUser = await createUser({
      name: 'Temp User',
      email: `temp${Date.now()}@example.com`,
      password_hash: 'temp123',
      profile_info: {},
    });
    expect(tempUser).not.toBeNull();

    const deleted = await deleteUser(tempUser!.user_id);
    expect(deleted).toBe(true);

    const fetched = await getUserById(tempUser!.user_id);
    expect(fetched).toBeNull();
  });
});

