# Tasks: Migrate Story Data to Supabase

## Status Legend
`[ ]` todo · `[→]` in progress · `[x]` done · `[!]` blocked

---

## T-01 — Install Supabase client
- **What**: Add `@supabase/supabase-js` to `heaven-and-hell-web`
- **Where**: `heaven-and-hell-web/package.json`
- **Command**: `pnpm add @supabase/supabase-js` (inside `heaven-and-hell-web/`)
- **Done when**: Package resolves in `node_modules`, no type errors
- **Status**: [ ]

---

## T-02 — Add env vars & example file
- **What**: Create `.env.local.example` with Supabase keys; add vars to `.env.local` (manual step by user)
- **Where**: `heaven-and-hell-web/.env.local.example`
- **Done when**: File exists; user has populated `.env.local` with real project URL + anon key
- **Gate**: `pnpm typecheck` passes
- **Status**: [ ]

---

## T-03 — Create Supabase client singleton
- **What**: `lib/supabase.ts` exporting `createServerClient()` using env vars
- **Where**: `heaven-and-hell-web/lib/supabase.ts`
- **Done when**: Module compiles; env vars are typed
- **Status**: [ ]

---

## T-04 — Write SQL migration: schema
- **What**: `supabase/migrations/001_story_schema.sql` with all 5 CREATE TABLE statements from design.md
- **Where**: `heaven-and-hell-web/supabase/migrations/001_story_schema.sql`
- **Done when**: SQL is syntactically valid; reviewable by user to run in Supabase dashboard
- **Status**: [ ]

---

## T-05 — Write SQL seed: EN data
- **What**: `supabase/migrations/002_story_seed_en.sql` with INSERT statements for all EN nodes
- **Where**: `heaven-and-hell-web/supabase/migrations/002_story_seed_en.sql`
- **Covers**: All entries in `NODE_STRUCTURE` + `enStory` from `story-data.ts`
- **Done when**: All 30+ nodes represented; choice sort_order matches original array index
- **Status**: [ ]

---

## T-06 — Write SQL seed: pt-BR data
- **What**: `supabase/migrations/003_story_seed_ptbr.sql` with INSERT statements for all pt-BR translations
- **Where**: `heaven-and-hell-web/supabase/migrations/003_story_seed_ptbr.sql`
- **Covers**: All entries in `ptBRStory` from `story-translations/pt-BR.ts`
- **Done when**: Translations complete for all nodes that have pt-BR content
- **Status**: [ ]

---

## T-07 — Create story-repository.ts
- **What**: `lib/story-repository.ts` with `getStoryNodes(locale)` async function
- **Where**: `heaven-and-hell-web/lib/story-repository.ts`
- **Logic**:
  1. Query Supabase with the join query from design.md
  2. Group rows by `node_id` into `StoryNode` objects
  3. Locale fallback to `en` if no translations found
  4. Return `Record<string, StoryNode>`
- **Reuses**: `StoryNode`, `Choice`, `Battle` types from `story-engine.ts`
- **Done when**: Function compiles with no type errors; shape matches existing `StoryNode`
- **Status**: [ ]

---

## T-08 — Update page.tsx to use repository
- **What**: Replace `import { getStoryNodes } from "@/lib/story-data"` with `import { getStoryNodes } from "@/lib/story-repository"`; function call is already `async` (server component), no other changes
- **Where**: `heaven-and-hell-web/app/game/page.tsx`
- **Done when**: Page imports from repository; no other files changed
- **Status**: [ ]

---

## T-09 — Verify build & typecheck
- **What**: Run `pnpm typecheck` and `pnpm build`
- **Where**: `heaven-and-hell-web/`
- **Done when**: Both pass with zero errors
- **Status**: [ ]

---

## T-10 — Smoke test game paths (manual)
- **What**: With dev server running, verify:
  - Intro → shadow path → both endings (en + pt-BR)
  - Intro → light path → both endings
  - Character select → valerius both paths → epilogues
  - Thalassa / Krell / Xandros → coming-soon endings
- **Done when**: All paths render correct text, battles work, locale switch works
- **Status**: [ ]

---

## T-11 — Deprecate static data files
- **What**: Remove `lib/story-data.ts` and `lib/story-translations/pt-BR.ts`; update any remaining imports
- **Depends on**: T-09 green, T-10 verified
- **Done when**: No import of `story-data` or `pt-BR` translation remains in codebase; `pnpm typecheck` still passes
- **Status**: [ ]

---

## Dependencies
```
T-01 → T-03 → T-07 → T-08 → T-09 → T-10 → T-11
T-02 (user must populate .env.local before T-07 can be tested)
T-04, T-05, T-06 (parallel — SQL files, user runs in Supabase dashboard before T-10)
```
