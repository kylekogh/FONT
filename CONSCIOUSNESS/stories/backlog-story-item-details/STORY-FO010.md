---
id: STORY-FO010
status: draft
priority: p1
quarter: Q4-2026
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO010: Meta-progression layer — roguelite outside-game loop

## Goal

A persistent layer above individual runs: each run (win or loss) earns a meta-currency that unlocks something permanent. Losing is always progress. The demo becomes a game you return to.

## Why

Kyle's vision (Issue #2): *"Each time you lose you gain points for an outside-game meta currency."*

This is the difference between a roguelike (every run is fresh, nothing carries) and a roguelite (each run earns something, the long arc rewards persistence). FONT's lore supports this — growth through repeated descent is core to how the world works (Rank earned through faction standing, not one-time achievement).

## Acceptance criteria

- A meta-currency is earned after every run (win or loss); loss earns less than victory but both award something
- At least 3 distinct things can be unlocked with meta-currency (starting options, lore fragments, cosmetic/faction unlocks)
- The meta-currency and unlock state persist between sessions (localStorage or equivalent)
- A clear UI shows current meta-currency and available unlocks
- The system is self-explanatory from first open (no external documentation needed)

## Tasks

- **TASK-FO028** — Design the meta-currency system
- **TASK-FO029** — Implement the meta-progression layer

## Notes

Design the currency in FONT terms — not "gold" or "coins." Candidates: **Ardour** (already the Kindled standing track — could double as the meta-currency for a Kindled-first demo), **Depth** (earned by how far you descended), **Spark** (accumulated across runs). Whatever is chosen should feel like it belongs in Sora. Lore fragments as unlocks tie directly to the founding myth and the descended traces — a player who grinds long enough should glimpse something true about what the dungeon is.
