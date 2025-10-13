# Table: media

**Purpose:**  
Stores uploaded media (images or videos) associated with climbs.  

---

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `media_id` | UUID | Primary Key | Unique identifier for media file |
| `file_url` | TEXT | NOT NULL | URL to file in Supabase Storage |
| `type` | TEXT | NOT NULL | Type of media (`image` or `video`) |
| `uploaded_at` | TIMESTAMP | DEFAULT now() | Timestamp of upload |

---

### Relationships

#### References to Other Tables
| Column | References | Relationship | Description |
|--------|------------|--------------|-------------|
| *(none)* | – | – | Media doesn't reference other tables |

#### Referenced By Other Tables
| Table | Column | Relationship | Description |
|-------|--------|--------------|-------------|
| `climb` | `media_id` | One-to-One (`1:1`) | Optional link between a climb and its media |

---

### Row-Level Security (RLS)

| Policy | Applies To | Description |
|--------|------------|-------------|
| `select_all_media` | SELECT | Allow users to view media linked to climbs they can access |
| `insert_media` | INSERT | Allow authenticated users to upload new media |

**Condition:**  
Media access is implicitly governed through climb/session ownership.

---

### Example Queries

```sql
-- Upload new media entry
INSERT INTO media (file_url, type)
VALUES ('https://xyz.supabase.co/storage/v1/object/public/climbs/video1.mp4', 'video');

-- Get all media for user’s climbs
SELECT m.*
FROM media m
JOIN climb c ON c.media_id = m.media_id
JOIN session s ON s.session_id = c.session_id
WHERE s.user_id = auth.uid();
```
