# Database Schema

This folder documents the Supabase database schema

Each table has its own `.md` file that explains:

- Purpose of the table
- Column names, data types, and constraints
- Relationships to other tables
- Row Level Security (RLS) policies
- Example queries

### Table Overview

| Table               | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `user`              | Stores all user profiles and account info             |
| `session`           | Climbing sessions created by users                    |
| `climb`             | Individual climbs within a session                    |
| `media`             | Photos/videos linked to climbs                        |
| `achievement`       | List of possible achievments                          |
| `user_achievement`  | Achievements earned by users                          |
| `challenge`         | Time-based or Goal-based competition with other users |
| `user_challenge`    | Challenge progress per user                           |
| `leaderboard`       | User scores and rankings                              |
| `spraywall_problem` | Custom boulder problems created by users              |
| `spraywall_attempt` | Attempts by users on spray wall problems              |