---
id: TASK-FO008
status: pending
priority: p1
story_id: STORY-FO002
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO007
---

# TASK-FO008: Build enemy intent display (action visible before player acts)

## What

Before the player takes their turn, the enemy's intended action for this turn is displayed — what it will do and for how much. The player can read this and plan accordingly. Implements acceptance criterion CMB-1.

## Done when

- **CMB-1 satisfied:** Enemy intent is visible before the player acts
- Intent displays at minimum: action type (attack/defend/buff/debuff) and value (damage amount or block amount)
- Intent updates correctly after the enemy executes (shows the next turn's action)
- Intent icons or labels are legible without external documentation (ties to UI-1)
- Multiple intents (multi-attack) are represented if any enemy uses them

## Notes

Intent display is FONT's window into enemy agency. In FONT lore terms, this is like reading the "moment before" — the weight of a move before it lands. Sensory design tip: the label doesn't need to say "3 attacks of 6" if a visual reading of "incoming — heavy, repeated" lands the same information. But clarity beats style; if in doubt, use numbers.
