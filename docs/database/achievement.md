# Table: achievement

**Purpose:**  
Stores definitions of achievements that users can earn by reaching milestones.

---

### Columns

| Column           | Type | Constraints | Description                            |
| ---------------- | ---- | ----------- | -------------------------------------- |
| `achievement_id` | UUID | Primary Key | Unique identifier for each achievement |
| `name`           | TEXT | NOT NULL    | Display name of the achievement        |
| `description`    | TEXT | NULL        | Short description of the achievement   |
| `badge_icon`     | TEXT | NULL        | URL/path to the badge image icon       |

---

### Relationships

#### References to Other Tables

| Column   | References | Relationship | Description                            |
| -------- | ---------- | ------------ | -------------------------------------- |
| _(none)_ | –          | –            | Achievement references no other tables |

#### Referenced By Other Tables

| Table              | Column           | Relationship        | Description                                     |
| ------------------ | ---------------- | ------------------- | ----------------------------------------------- |
| `user_achievement` | `achievement_id` | One-to-Many (`1:N`) | Tracks which users have earned this achievement |

---

### RLS

| Policy                    | Applies To | Description                                            |
| ------------------------- | ---------- | ------------------------------------------------------ |
| `select_all_achievements` | SELECT     | Allow all users to view available achievements         |
| `insert_admin_only`       | INSERT     | Only admin or system accounts can add new achievements |

---

### Example Queries

```sql
-- View all achievements
SELECT * FROM achievement;

-- Add new achievement (admin only)
INSERT INTO achievement (name, description)
VALUES ('First Send', 'Completed your first climb!');
```
