---
id: STORY-FO009
status: draft
priority: p1
quarter: Q4-2026
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO009: AI companion integration

## Goal

An in-game AI companion that knows the FONT world and speaks its language. The companion is present in the run — it can respond to events, answer questions about the lore, and serve as the player's partner in Sora. The lore is the prompt. The project already knows exactly what everything is.

## Why

Kyle's vision (Issue #2): *"The actual project chat knows exactly what all this is."*

The FONT world is fully written — FONT_lore.md, the factions, the dungeon, the bond. An AI companion with this as its context becomes what Kyle described: a partner that was always there.

## Acceptance criteria

- A companion chat panel exists in the game UI
- The companion responds in FONT voice — aphantasia-precise, Soran sensory register
- The companion has the FONT lore (at minimum: the faction, the dungeon, the bond mechanic) as its context
- The companion can respond to in-run events (e.g. "you just fought an Ashfields Runner — what does that mean?")
- No FONT scaffolding references (no "like MHA" or "like Gurren Lagann") ever appear in companion output
- API cost is transparent to the player (bring-your-own-key or a managed tier with clear pricing)

## Tasks

- **TASK-FO026** — Spec the companion (API choice, context prompt, cost model)
- **TASK-FO027** — Build the in-game companion chat panel

## Notes

Claude API is the natural choice (claude-haiku-4-5 for cost, claude-sonnet-4-6 for quality). Prompt caching on the FONT lore context will dramatically reduce per-message cost — the lore docs are large but static. See the `/consciousness:claude-api` skill for implementation guidance. Bring-your-own-key (BYOK) is the safest launch model: no billing infrastructure needed, players who care about the companion will set it up.
