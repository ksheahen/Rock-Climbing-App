# Table: user

**Purpose:**
Stores registered users and their profile information. Connected to all other tables using `user_id`

---

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | Primary Key | Unique identifier for each user |
| `name` | TEXT | NOT NULL | User's display name |
| `email` | TEXT | UNIQUE, NOT NULL | User's email for login |
| `password_hash` | TEXT | NOT NULL | Encrypted password |
| `profile_info` | JSONB (JSON binary) | NULL | Optional addition profile data |
| `fitness_watch_id` | TEXT | NULL | External ID for fitness watch integration |

---

### Relationships

- 'user_id' -> referenced by:
    - `session.user_id`
    - `user_achievement.user_id`
    - `user_challenge.user_id`
    - `leaderboard.user_id`
    - `spraywall_problem.user_id`
    - `spraywall_attempt.user_id`

---

### Row-Level Security (RLS)

| Policy | Applies To | Description |
|--------|------------|-------------|
| `select_own_profile` | SELECT | Allows user sto view their own profile |
| ` update_own_profile` | UPDATE | Allows users to update only their own profile |
| `insert_user` | INSERT | Allows authenticated users to create their account |
| `delete_own_user` | DELETE | Allows users to delete their own account |

**RLS Notes:**
All policies use `auth.uid() = user_id` for access control. This ensures users can only access their own data.

---

### Example Query

```sql
-- Get current user info
SELECT * FROM user WHERE user_id = auth.uid();
```