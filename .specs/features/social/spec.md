---
name: Social Features
type: feature
status: designing
---

# Social Features Spec

## Context

Heaven & Hell is currently a pure client-side story game. This feature adds social capabilities.

## User decisions (from discuss phase)

- **Backend**: Supabase (PostgreSQL + auth + realtime)
- **Twitter share**: Web Intent (no API keys — user manually posts)
- **Victory rate**: Both good-ending % AND average battle attempts
- **Friends feed**: ending reached + journey path + dice rolls + timestamp

## Requirements

### S-01 — Share to X
- On EndingScene, show a "Share on X" button
- Composes a Web Intent URL: `https://twitter.com/intent/tweet?text=...`
- Text includes: ending title, ending type (Salvation/Fallen), game hashtag `#HeavenAndHell`
- Opens in new tab
- No login required

### S-02 — Authentication
- Email + password signup/login via Supabase Auth
- Optional: Google OAuth
- `/auth` page with login and signup tabs
- Session persisted via Supabase SSR cookies
- User menu in top-right of layout: shows avatar/nickname when logged in, "Sign In" when not
- Logout action

### S-03 — Profile & Stats
- `/profile` page (requires login)
- Stats shown:
  - Total games played
  - Good ending rate (% of games that ended in salvation)
  - Average dice attempts per battle (across all games)
- Player nickname displayed

### S-04 — Save Game Result
- When a logged-in user reaches an ending, auto-save result to DB
- Saved: ending_type, ending_title, path (JSON), completed_at
- Silent save (no UI disruption)
- Unauthenticated users: result not saved (prompt to log in to track stats)

### S-05 — Friend System
- `/friends` page (requires login)
- Search users by: nickname, full name, or email
- Send friend request → creates pending friendship
- Recipient sees pending requests in `/friends` page with Accept / Decline
- Accepted friendship is bidirectional
- Can only see friends' feed after acceptance

### S-06 — Friends Feed
- `/friends` page shows accepted friends' recent game results
- Each entry: friend nickname + ending reached + timestamp
- Expandable: click to see full journey path + dice rolls
- Ordered by most recent first
- Shows up to 20 most recent results across all friends

## Data Model

```sql
-- profiles
id uuid PK → auth.users.id
nickname text UNIQUE NOT NULL
full_name text
avatar_url text
created_at timestamptz

-- game_results  
id uuid PK
user_id uuid → auth.users.id
ending_type 'good' | 'bad'
ending_title text
path jsonb  -- PathStep[]
completed_at timestamptz

-- friendships
id uuid PK
requester_id uuid → auth.users.id
addressee_id uuid → auth.users.id
status 'pending' | 'accepted' | 'declined'
created_at timestamptz
UNIQUE(requester_id, addressee_id)
```

## Out of scope
- Real-time feed updates (polling on page load is sufficient)
- Push notifications
- Blocking/unfriending (can add later)
- Leaderboards
