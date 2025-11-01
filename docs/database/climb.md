# Table: climb

**Purpose:**  
Stores individual climbs logged during a climbing session. Each climb is associated with a session and may include media, rating, and notes.

---

### Columns

| Column       | Type                       | Constraints | Description |
|--------------|----------------------------|-------------|-------------|
| `climb_id`   | UUID                       | Primary Key, Default `gen_random_uuid()` | Unique identifier for each climb |
| `session_id` | UUID                       | Foreign Key -> `session.session_id`, NOT NULL | References the parent climbing session |
| `acct_id`    | UUID                       | Foreign Key -> `user.user_id`, NOT NULL | User who logged the climb |
| `type`       | TEXT                       | NOT NULL    | Type of climb (`boulder` or `route`) |
| `difficulty` | TEXT                       | NOT NULL    | Grade of the climb (V0–V17 or 5.0–5.15d) |
| `attempts`   | INTEGER                    | NOT NULL    | Number of attempts made to complete the climb |
| `rating`     | INTEGER                    | NOT NULL, CHECK (`rating <= 3`) | User rating of the climb (1–3 stars) |
| `description`| TEXT                       | NULL        | Optional notes or description |
| `media`      | TEXT                       | NULL        | Optional URL or reference to attached media |
| `completed`  | BOOLEAN                    | NULL        | Whether the climb was completed |
| `datetime`   | TIMESTAMP WITH TIME ZONE   | NOT NULL    | When the climb was done |
| `created_at` | TIMESTAMP WITH TIME ZONE   | NOT NULL, Default `now()` | Timestamp of creation |
| `updated_at` | TIMESTAMP WITH TIME ZONE   | NOT NULL, Default `now()` | Timestamp of last update |

---

### Relationships

#### References to Other Tables (Foreign Keys)
| Column       | References          | Relationship | Description |
|--------------|------------------|--------------|-------------|
| `session_id` | `session.session_id` | Many-to-One (`N:1`) | Each climb belongs to one session |
| `acct_id`    | `user.user_id`      | Many-to-One (`N:1`) | Each climb is owned by one user |

#### Referenced By Other Tables
| Table | Column | Relationship | Description |
|-------|--------|-------------|-------------|
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
INSERT INTO climb (
  session_id,
  acct_id,
  type,
  difficulty,
  attempts,
  rating,
  description,
  media,
  completed,
  datetime,
  created_at,
  updated_at
)
VALUES (
  '<session_uuid>',
  '<user_uuid>',
  'boulder',
  'V5',
  3,
  3,
  'Felt strong today, tricky move at the top',
  'https://xyz.supabase.co/storage/v1/object/public/climbs/video1.mp4',
  true,
  now(),
  now(),
  now()
)
RETURNING climb_id;
```