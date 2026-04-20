# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository structure

This repo has two layers:

- **`/` (root)** — Narrative design documents. `README.md` contains the story bible, character roster, and chapter flow diagrams for "A Vanguarda da Terra: Os Porta-Crashers" (written in Portuguese). This is the source of truth for lore, characters, and narrative arcs.
- **`heaven-and-hell-web/`** — The web implementation. A Next.js 16 interactive story game. All code work happens here.

## Web project commands

All commands run from inside `heaven-and-hell-web/`:

```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Production build
pnpm typecheck    # TypeScript check (tsc --noEmit)
pnpm lint         # ESLint
pnpm format       # Prettier (writes to all .ts/.tsx files)
```

No test runner is configured.

## Architecture

### Stack
- **Next.js 16** App Router — no `src/` directory; `app/` lives at the project root
- **React 19** — use the new JSX transform; no need to import React explicitly
- **Tailwind CSS v4** — CSS-first config. No `tailwind.config.js`. All theme tokens are CSS variables defined in `app/globals.css` under `@theme inline`. Dark mode uses the `.dark` class via next-themes. Animation utilities come from `tw-animate-css` (`animate-in`, `fade-in`, `slide-in-from-*`, `zoom-in`, etc.)
- **shadcn/ui** with `radix-nova` style — components go in `components/ui/`. Add new ones with `npx shadcn@latest add <component>`. Uses `radix-ui` (the unified package, not individual `@radix-ui/*` packages).
- **Path alias**: `@/*` maps to the root of `heaven-and-hell-web/` (e.g. `@/lib/utils`, `@/components/ui/button`)

### Game engine

The story game is a pure client-side state machine driven by a single `nodeId` string:

```
lib/story-engine.ts   → StoryNode / Battle / Choice types + checkWin()
lib/story-data.ts     → STORY_NODES record + STARTING_NODE constant
app/game/page.tsx     → useState(nodeId) drives which scene component renders
components/game/
  story-scene.tsx     → renders text + choice buttons (nodes with choices[])
  battle-scene.tsx    → renders dice battle (nodes with battle{}); owns roll animation state internally
  ending-scene.tsx    → renders terminal nodes (isEnding: true)
```

**Node types** are distinguished by which optional fields are present:
- Has `choices[]` → story choice node → `StoryScene`
- Has `battle{}` → dice battle node → `BattleScene`
- Has `isEnding: true` → terminal node → `EndingScene`

**Adding story content**: add entries to `STORY_NODES` in `lib/story-data.ts`. Each battle node specifies `diceMax`, `winMin`, optional `winMax` (defaults to `diceMax`), and `winNextId`. The `checkWin()` function handles range evaluation.

**Dice animation** in `BattleScene`: internal phase state machine (`ready → rolling → result`). Rolling uses `setInterval` at 80ms for 20 ticks then resolves the final result. "Try Again" resets phase back to `ready` — no nodeId change needed since the battle re-runs on the same node.

### Styling conventions
- Use `cn()` from `@/lib/utils` for all conditional class merging (wraps `clsx` + `tailwind-merge`)
- Client components require `"use client"` at the top
- Scene transitions use `key={nodeId}` on the wrapper div — React remount triggers `animate-in fade-in duration-500`
- Color tokens: use CSS variable-backed classes (`bg-card`, `text-muted-foreground`, `border-border`, etc.) — never hardcode colors for themed UI

### Characters (from README.md lore)
| Hero | Class |
|------|-------|
| Thalassa "A Raiz" | Guardiã Primordial |
| Valerius Bolt | Valquíria Coroada pela Tempestade |
| Krell, o Inquebrantável | Juggernaut Rúnico |
| Arquivista Xandros | Mago de Batalha Eldrítico |
| Seraphina Noir | Inquisidora Forjada no Inferno |

Narrative arc: five parallel origin chapters → convergence at "A Encruzilhada do Destino" → Ato 2 at the Gates of Dis. Story flows are diagrammed in `README.md` as Mermaid graphs.
