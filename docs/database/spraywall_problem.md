# Table: spraywall_problem

**Purpose:**  
Defines custom boulder problems users create on a spray wall.

---

### Columns

| Column                | Type                | Constraints          | Description                        |
| --------------------- | ------------------- | -------------------- | ---------------------------------- |
| `problem_id`          | UUID                | Primary Key          | Unique identifier for the problem  |
| `user_id`             | UUID                | FK -> `user.user_id` | Creator of the problem             |
| `holds`               | JSONB (JSON binary) | NOT NULL             | Data of selected holds on the wall |
| `assigned_difficulty` | TEXT                | NULL                 | Estimated difficulty (V-grade)     |
| `description`         | TEXT                | NULL                 | Optional problem description       |

---

### Relationships

| Column    | References     | Relationship | Description             |
| --------- | -------------- | ------------ | ----------------------- |
| `user_id` | `user.user_id` | N:1          | Problem created by user |

#### Referenced By:

| Table               | Column       | Relationship | Description                   |
| ------------------- | ------------ | ------------ | ----------------------------- |
| `spraywall_attempt` | `problem_id` | 1:N          | Attempts made on this problem |

---

### RLS

```sql
auth.uid() = user_id
```

### Example Queries

```sql
-- Get all problems by current user
SELECT * FROM spraywall_problem WHERE user_id = auth.uid();
```