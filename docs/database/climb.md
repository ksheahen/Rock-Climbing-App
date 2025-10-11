# Table: climb

**Purpose:**  
Stores individual climbs logged during a climbing session. Each climb is associated with a session and may include media, rating, and notes.

---

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `climb_id` | UUID | Primary Key | Unique identifier for each climb |
| `session_id` | UUID | Foreign Key -> `session.session_id` | References the parent climbing session |
| `type` | TEXT | NOT NULL | Type of climb (`boulder` or `route`) |
| `grade` | TEXT | NOT NULL | Grade of the climb (V0–V17 or 5.0–5.15d) |
| `attempts` | INTEGER | NOT NULL | Number of attempts made to complete the climb |
| `rating` | INTEGER | NULL | User rating of the climb (1–5 stars) |
| `comments` | TEXT | NULL | Optional notes or description |
| `media_id` | UUID | Foreign Key → `media.media_id` | Optional reference to attached image/video |

---

### Relationships

#### References to Other Tables (Foreign Keys)
| Column | References | Relationship | Description |
|--------|------------|--------------|-------------|
| `session_id` | `session.session_id` | Many-to-One (`N:1`) | Each climb belongs to one session |
| `media_id` | `media.media_id` | One-to-One (`1:1`) | Optional attached media for a climb |

#### Referenced By Other Tables
| Table | Column | Relationship | Description |
|-------|--------|--------------|-------------|
| *(none)* | – | – | Climbs are not referenced elsewhere |

---

### Row-Level Security (RLS)

| Policy | Applies To | Description |
|--------|------------|-------------|
| `select_own_climbs` | SELECT | Users can view climbs in their own sessions |
| `insert_own_climbs` | INSERT | Users can log climbs in their own sessions |
| `update_own_climbs` | UPDATE | Users can edit their own climbs |
| `delete_own_climbs` | DELETE | Users can delete their own climbs |

**RLS Condition:**  
```sql
auth.uid() IN (SELECT user_id FROM session WHERE session_id = climb.session_id)
```

### Example Queries
```sql
-- Get all climbs for a user
SELECT c.*
FROM climb c
JOIN session s ON s.session_id = c.session_id
WHERE s.user_id = auth.uid();

-- Insert a new climb
INSERT INTO climb (session_id, type, grade, attempts, rating)
VALUES ('<session_uuid>', 'boulder', 'V5', 3, 5);
```