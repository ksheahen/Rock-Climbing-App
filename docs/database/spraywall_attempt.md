# Table: spraywall_attempt

**Purpose:**  
Tracks user attempts on custom spray wall problems.

---

### Columns

| Column       | Type    | Constraints                          | Description                            |
| ------------ | ------- | ------------------------------------ | -------------------------------------- |
| `attempt_id` | UUID    | Primary Key                          | Unique attempt identifier              |
| `problem_id` | UUID    | FK -> `spraywall_problem.problem_id` | Associated spray wall problem          |
| `user_id`    | UUID    | FK -> `user.user_id`                 | User making the attempt                |
| `attempts`   | INTEGER | DEFAULT 1                            | Number of attempts made                |
| `completed`  | BOOLEAN | DEFAULT false                        | Whether the user completed the problem |

---

### Relationships

| Column       | References                     | Relationship | Description               |
| ------------ | ------------------------------ | ------------ | ------------------------- |
| `problem_id` | `spraywall_problem.problem_id` | N:1          | Problem attempted         |
| `user_id`    | `user.user_id`                 | N:1          | User who made the attempt |

---

### RLS

```sql
auth.uid() = user_id
```

### Example Queries

```sql
-- Get attempts for current user
SELECT * FROM spraywall_attempt WHERE user_id = auth.uid();

-- Log new attempt
INSERT INTO spraywall_attempt (problem_id, user_id, attempts, completed)
VALUES ('<problem_uuid>', auth.uid(), 2, false);
```