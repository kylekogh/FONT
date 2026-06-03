---
id: ADR-FO001
status: accepted
created: 2026-06-03
updated: 2026-06-03
decider: Kyle
---

# ADR-FO001: Tech stack — React + Vite

## Decision

**React + Vite** for the FONT roguelike deckbuilder demo.

## Context

The demo requires:
- A hand of cards (rendered, interactive, playable)
- A combat tracker (enemy HP, intent, status effects — updating each turn)
- A run map (nodes, visited state, routing)
- A draft/reward screen (card selection post-combat)
- A relic tray (persistent across screens)

All of these are stateful UI components that update in response to game events. Managing this in a single HTML file (the existing font-fork.html pattern) would work for a simpler app but gets unwieldy at this complexity level — 30+ card types, a full combat loop, and multiple distinct screens.

## Alternatives considered

| Option | Verdict |
|---|---|
| **Single HTML file (inline CSS/JS)** | Rejected — font-fork.html is already large as a TTRPG oracle. A deckbuilder with 30+ cards, a combat engine, and multiple screens in one file would be unworkable to maintain. |
| **React + Vite** | ✅ Chosen — component model maps cleanly to the game's UI (Card, Hand, CombatTracker, NodeMap as discrete components). Vite's dev server is fast. Build output is a static bundle deployable to Cloudflare Pages. |
| **Phaser** | Rejected — game engine overhead isn't justified for this demo scope. Phaser shines for sprite-based games with animations; FONT's card UI is DOM-native and doesn't need a canvas renderer. Can be revisited for a future native mobile version. |

## Consequences

- **Build step required** — `npm run build` before deploying. Acceptable for demo scope.
- **Cloudflare Pages compatible** — Vite's static output deploys identically to the current HTML file. No infrastructure change needed.
- **TypeScript** — use it. The card data schema (TASK-FO003) and game state will be complex enough that types are worth the setup cost.
- **No external UI library** — no MUI, no Tailwind. FONT has a defined visual identity (Midnight & Gold palette, Zen Dots / Fraunces fonts). Build the styles directly rather than fighting a framework's defaults.
- **State management** — React's `useState` / `useReducer` is sufficient for demo scope. Don't reach for Redux unless the state complexity demands it.

## First steps unlocked

- TASK-FO003 — define card data schema (TypeScript types)
- TASK-FO022 — lore-to-mechanics design doc (no tech dependency, can run in parallel)
