# Feature Spec: Migrate Story Data to Supabase

## ID
`FEAT-SUP-001`

## Problem
`lib/story-data.ts` contains all story nodes and translations as static TypeScript objects. As the narrative grows indefinitely, this creates:
- Ever-growing source files that bloat the bundle
- No way to add/edit content without a code deploy
- No separation between content authoring and development

## Goal
Move all story nodes, translations, and structural data into Supabase so content can grow and be edited independently of the codebase.

## Requirements

### REQ-01 — Database Schema
Store all story data in Supabase with normalized tables covering:
- Locale-independent node structure (id, image_url, is_ending, ending_type)
- Per-node choices (ordered, each with a `next_node_id`)
- Per-node battle mechanics (dice_max, win_min, win_max, win_next_id)
- Node translations per locale (title, text, battle_description)
- Choice translations per locale (choice text)

### REQ-02 — Seed Migration
All existing nodes (EN + pt-BR) from `story-data.ts` and `story-translations/pt-BR.ts` are migrated into the database via a seed SQL file. No data loss.

### REQ-03 — Image Handling
Local static assets (`/public/assets/*.png`) remain as Next.js static files. The database stores relative paths (`/assets/filename.png`) for local images and full URLs for external ones (picsum.photos). The data layer resolves the correct value at query time.

### REQ-04 — Data Access Layer
A new server-side module `lib/story-repository.ts` exports `getStoryNodes(locale: string): Promise<Record<string, StoryNode>>` that:
- Fetches all nodes from Supabase in a single query (joining translations, choices, and battles)
- Falls back to `"en"` if the requested locale has no translations
- Returns data in the same `Record<string, StoryNode>` shape consumed by `GameClient`

### REQ-05 — Minimal App-Layer Change
`app/game/page.tsx` switches from the synchronous `getStoryNodes(locale)` (story-data.ts) to the async `getStoryNodes(locale)` from `story-repository.ts`. No changes to `GameClient`, scene components, or `story-engine.ts`.

### REQ-06 — Remove Static Data Files (cleanup)
After migration is verified, `lib/story-data.ts` and `lib/story-translations/pt-BR.ts` are either replaced with thin stubs or removed. The inline `enStory` constant is dropped. `StoryTranslation` type in `story-translations/types.ts` is kept (still useful as a seed/type reference).

### REQ-07 — Environment Config
Supabase URL and anon key are read from environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). A `.env.local.example` is added documenting required vars.

## Out of Scope
- Admin UI for editing story content
- Per-node lazy loading (fetch-one-at-a-time) — keep fetch-all strategy for now
- Supabase Auth / Row Level Security (story data is public read)
- Image upload to Supabase Storage (local assets stay in /public)

## Acceptance Criteria
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] Game page loads and all nodes render correctly in both `en` and `pt-BR`
- [ ] All story paths (intro→endings, valerius both paths, thalassa/krell/xandros stubs) work identically to pre-migration
- [ ] No story text is hardcoded in TypeScript (except `STARTING_NODE` constant)
