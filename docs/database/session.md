# Table: session

**Purpose:**  
Represents an individual climbing session created by a user.  
A session is the parent container for all climbs logged during that session (gym, outdoor, etc.).

---

### Columns

| Column       | Type | Constraints                   | Description                                                     |
| ------------ | ---- | ----------------------------- | --------------------------------------------------------------- |
| `session_id` | UUID | Primary Key                   | Unique identifier for each climbing session                     |
| `user_id`    | UUID | Foreign Key -> `user.user_id` | References the user who owns this session                       |
| `date`       | DATE | NOT NULL                      | Date the session took place                                     |
| `location`   | TEXT | NOT NULL                      | Location type (`gym`, `outdoors`, `etc.`)                       |
| `source`     | TEXT | NULL                          | Origin of the session data (e.g., `manual`, `watch`, `offline`) |

---

### Relationships

#### References to Other Tables (Foreign Keys)

| Column    | References     | Relationship        | Description                      |
| --------- | -------------- | ------------------- | -------------------------------- |
| `user_id` | `user.user_id` | Many-to-One (`N:1`) | Each session belongs to one user |

#### Referenced By Other Tables

| Table   | Column       | Relationship        | Description                                    |
| ------- | ------------ | ------------------- | ---------------------------------------------- |
| `climb` | `session_id` | One-to-Many (`1:N`) | A session can have many climbs logged under it |

---

### Row-Level Security (RLS)

| Policy                | Applies To | Description                                  |
| --------------------- | ---------- | -------------------------------------------- |
| `select_own_sessions` | SELECT     | Users can view only their own sessions       |
| `insert_own_sessions` | INSERT     | Users can create new sessions for themselves |
| `update_own_sessions` | UPDATE     | Users can modify their own sessions          |
| `delete_own_sessions` | DELETE     | Users can delete their own sessions          |

**RLS Condition:**

```sql
auth.uid() = user_id
```

### Example Query

```sql
-- Get all sessions for the current user
SELECT * FROM session WHERE user_id = auth.uid();

-- Insert a new session
INSERT INTO session (user_id, date, location, source)
VALUES (auth.uid(), CURRENT_DATE, 'Gym', 'Manual');

-- Delete a session (only allowed for the owner)
DELETE FROM session WHERE session_id = '<session_uuid>' AND user_id = auth.uid();
```
