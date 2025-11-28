# Table: challenge

**Purpose:**  
Defines challenges users can participate in (time-based or goal-based).

---

### Columns

| Column         | Type | Constraints | Description                          |
| -------------- | ---- | ----------- | ------------------------------------ |
| `challenge_id` | UUID | Primary Key | Unique identifier for each challenge |
| `title`        | TEXT | NOT NULL    | Challenge name                       |
| `description`  | TEXT | NULL        | Description of the challenge         |
| `start_date`   | DATE | NOT NULL    | Start date                           |
| `end_date`     | DATE | NOT NULL    | End date                             |

---

### Relationships

#### Referenced By Other Tables

| Table            | Column         | Relationship        | Description                      |
| ---------------- | -------------- | ------------------- | -------------------------------- |
| `user_challenge` | `challenge_id` | One-to-Many (`1:N`) | Links participants to challenges |

---

### RLS

| Policy                  | Applies To | Description                               |
| ----------------------- | ---------- | ----------------------------------------- |
| `select_all_challenges` | SELECT     | Allow all users to view active challenges |
| `insert_admin_only`     | INSERT     | Only admins may create challenges         |

---

### Example Queries

```sql
SELECT * FROM challenge WHERE CURRENT_DATE BETWEEN start_date AND end_date;
```
