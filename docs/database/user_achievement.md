# Table: user_achievement

**Purpose:**  
Tracks which achievements each user has earned and when.

---

### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `user_id` | UUID | Foreign Key -> `user.user_id` | User who earned the achievement |
| `achievement_id` | UUID | Foreign Key -> `achievement.achievement_id` | The earned achievement |
| `earned_date` | TIMESTAMP | DEFAULT now() | When the achievement was earned |

---

### Relationships

#### References to Other Tables
| Column | References | Relationship | Description |
|--------|------------|--------------|-------------|
| `user_id` | `user.user_id` | Many-to-One (`N:1`) | Links earned achievement to a user |
| `achievement_id` | `achievement.achievement_id` | Many-to-One (`N:1`) | Links to achievement definition |

#### 🔁 Referenced By Other Tables
| Table | Column | Relationship | Description |
|-------|--------|--------------|-------------|
| *(none)* | – | – | user_achievement references is not referenced by other tables |

---

### RLS

| Policy | Applies To | Description |
|--------|------------|-------------|
| `select_own_achievements` | SELECT | Users can view only their own earned achievements |
| `insert_own_achievements` | INSERT | Users can add achievements for themselves (automated) |

**Condition:**  
```sql
auth.uid() = user_id
```

### Example Query
```sql
-- Get current user’s achievements
SELECT a.name, ua.earned_date
FROM user_achievement ua
JOIN achievement a ON a.achievement_id = ua.achievement_id
WHERE ua.user_id = auth.uid();
```