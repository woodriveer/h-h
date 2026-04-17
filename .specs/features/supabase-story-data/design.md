# Design: Migrate Story Data to Supabase

## Database Schema

```sql
-- Locale-independent node structure
create table story_nodes (
  id           text primary key,
  image_url    text,             -- relative path (/assets/x.png) or full URL
  is_ending    boolean not null default false,
  ending_type  text check (ending_type in ('good', 'bad')),
  sort_order   integer not null default 0
);

-- Ordered choices per node (up to N per node)
create table story_choices (
  id           serial primary key,
  node_id      text not null references story_nodes(id) on delete cascade,
  sort_order   integer not null,
  next_node_id text not null,
  unique (node_id, sort_order)
);

-- 1:1 battle data per node
create table story_battles (
  node_id      text primary key references story_nodes(id) on delete cascade,
  dice_max     integer not null,
  win_min      integer not null,
  win_max      integer,
  win_next_id  text not null
);

-- Content per node per locale
create table story_node_translations (
  node_id            text not null references story_nodes(id) on delete cascade,
  locale             text not null,
  title              text not null,
  text               text,
  battle_description text,
  primary key (node_id, locale)
);

-- Choice text per locale
create table story_choice_translations (
  choice_id  integer not null references story_choices(id) on delete cascade,
  locale     text not null,
  text       text not null,
  primary key (choice_id, locale)
);
```

## Query Strategy

Single SQL query using `left join` to pull all tables in one round-trip:

```sql
select
  n.id, n.image_url, n.is_ending, n.ending_type,
  t.title, t.text, t.battle_description,
  b.dice_max, b.win_min, b.win_max, b.win_next_id,
  c.id as choice_id, c.sort_order as choice_order, c.next_node_id,
  ct.text as choice_text
from story_nodes n
left join story_node_translations t
  on t.node_id = n.id and t.locale = $locale
left join story_battles b on b.node_id = n.id
left join story_choices c on c.node_id = n.id
left join story_choice_translations ct
  on ct.choice_id = c.id and ct.locale = $locale
order by n.sort_order, c.sort_order
```

The repository assembles rows into `Record<string, StoryNode>` in JavaScript.

## Module Layout

```
lib/
  supabase.ts                  ← createClient() singleton (server-side)
  story-repository.ts          ← getStoryNodes(locale) — replaces story-data.ts public API
  story-engine.ts              ← unchanged (types only)
  story-translations/
    types.ts                   ← kept as-is (useful for seed tooling)
supabase/
  migrations/
    001_story_schema.sql       ← CREATE TABLE statements
    002_story_seed.sql         ← INSERT for all existing EN + pt-BR data
.env.local.example             ← documents required env vars
```

## Locale Fallback

If `story_node_translations` has no row for the requested locale, the repository re-queries with `locale = 'en'`. This is done in application code (two sequential queries) to avoid complex SQL. In practice, all locales are seeded for all nodes so the fallback path is only a safety net.

## Image Resolution

The `story_nodes.image_url` column stores:
- `/assets/valerious_start.png` for local Next.js static files
- `https://picsum.photos/seed/.../1200/500` for external placeholder images

The repository returns these as plain strings. `GameClient` / scene components already handle both `string` and `StaticImageData` for the `image` prop (typed as `any` in `StoryNode`). No change needed there — local paths work natively in `<Image src="/assets/...">`.

## Dependencies

```json
"@supabase/supabase-js": "^2"
```

No additional packages needed.

## Risk: Cold Start / Edge Latency

`page.tsx` is a Next.js server component. With ISR or edge caching on the route, the Supabase query runs at build time or at cache-miss time, not on every request. Acceptable for now. Future optimization: `unstable_cache` wrapper around `getStoryNodes` with a tag for on-demand revalidation.
