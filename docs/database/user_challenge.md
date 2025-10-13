# Table: user_challenge

**Purpose:**  
Tracks user participation and progress in challenges.

---

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | FK -> `user.user_id` | Challenge participant |
| `challenge_id` | UUID | FK -> `challenge.challenge_id` | Associated challenge |
| `progress` | INTEGER | DEFAULT 0 | Current progress metric |
| `status` | TEXT | DEFAULT 'in progress' | Status: `in progress`, `complete`, or `failed` |

---

### Relationships

| Column | References | Relationship | Description |
|--------|------------|--------------|-------------|
| `user_id` | `user.user_id` | N:1 | Participant user |
| `challenge_id` | `challenge.challenge_id` | N:1 | Challenge joined by user |

---

### RLS

```sql
auth.uid() = user_id
```

### Example Queries
```sql
-- Get active challenges for current user
SELECT uc.*, c.title
FROM user_challenge uc
JOIN challenge c ON c.challenge_id = uc.challenge_id
WHERE uc.user_id = auth.uid();
```