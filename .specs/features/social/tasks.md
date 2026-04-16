---
name: Social Features Tasks
---

# Tasks

## T1 — Install packages + env scaffold
- Install `@supabase/supabase-js` and `@supabase/ssr`
- Create `.env.local.example` with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
- Create `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/types.ts`
- Status: pending

## T2 — Supabase DB schema
- Write SQL migration in `supabase/migrations/001_social.sql`
- Tables: profiles, game_results, friendships
- RLS policies: users can only read their own data + accepted friends
- Status: pending

## T3 — Auth: login/signup page
- `app/auth/page.tsx` with login + signup tabs
- `components/auth/auth-form.tsx` — email/password form
- `app/auth/callback/route.ts` — OAuth callback handler
- Status: pending

## T4 — Layout: user menu + nav
- `components/auth/user-menu.tsx` — avatar + dropdown (Profile, Friends, Sign Out)
- Add user menu to `app/layout.tsx` (top-right)
- Status: pending

## T5 — Share to X button (S-01)
- `components/game/share-button.tsx` — Web Intent button
- Add to `components/game/ending-scene.tsx`
- Status: pending

## T6 — Save game result (S-04)
- `app/actions/save-game-result.ts` — server action
- Call from `app/game/page.tsx` on ending reached (if session exists)
- Status: pending

## T7 — Profile/stats page (S-03)
- `app/profile/page.tsx` — server component, redirects to /auth if not logged in
- Aggregation queries from game_results
- Status: pending

## T8 — Friends system (S-05)
- `app/friends/page.tsx` — layout for search + requests + feed
- `components/friends/friend-search.tsx` — search + send request
- `components/friends/friend-requests.tsx` — pending requests with accept/decline
- `app/actions/friend-actions.ts` — send/accept/decline server actions
- Status: pending

## T9 — Friends feed (S-06)
- `components/friends/friends-feed.tsx` — feed items with expandable journey
- Server action to fetch friends' game_results
- Status: pending
