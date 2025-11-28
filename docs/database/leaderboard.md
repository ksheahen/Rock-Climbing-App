# Table: leaderboard

**Purpose:**  
Tracks user rankings and scores based on performance and achievements.

---

### Columns

| Column           | Type    | Constraints          | Description                        |
| ---------------- | ------- | -------------------- | ---------------------------------- |
| `leaderboard_id` | UUID    | Primary Key          | Unique row identifier              |
| `user_id`        | UUID    | FK -> `user.user_id` | User ranked on the leaderboard     |
| `rank`           | INTEGER | NULL                 | User’s position on the leaderboard |
| `score`          | INTEGER | DEFAULT 0            | User’s total score or points       |

---

### Relationships

| Column    | References     | Relationship | Description                              |
| --------- | -------------- | ------------ | ---------------------------------------- |
| `user_id` | `user.user_id` | N:1          | Each leaderboard entry belongs to a user |

---

### RLS

| Policy              | Applies To | Description                         |
| ------------------- | ---------- | ----------------------------------- |
| `select_all`        | SELECT     | All users can view leaderboard      |
| `update_admin_only` | UPDATE     | Only system/admin can update scores |

---

### Example Queries

```sql
SELECT u.name, l.score, l.rank
FROM leaderboard l
JOIN user u ON u.user_id = l.user_id
ORDER BY l.score DESC;
```
