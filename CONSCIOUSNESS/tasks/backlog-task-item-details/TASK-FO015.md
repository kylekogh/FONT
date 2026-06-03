---
id: TASK-FO015
status: pending
priority: p2
story_id: STORY-FO004
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# TASK-FO015: Implement 5 relics with distinct run-modifying effects

## What

Five relics the player can acquire during a run (from events, shops, or boss rewards) that persistently modify how the run plays. Each must do something meaningfully different. Implements PLR-1.

## Done when

- **PLR-1 satisfied:** At least 5 relics exist with distinct, correctly functioning effects
- Each relic's effect is active and applied correctly for the full run from the moment of acquisition
- Relics are displayed in the player's relic tray and readable via tooltip (no external documentation needed)
- No two relics have functionally identical effects
- At least one relic is Kindled-themed (ties to FONT integration)

## Suggested relic design space (starting point)

- Passive damage bonus (e.g. +1 damage on first attack each turn)
- Healing trigger (e.g. heal when you play 3 skills in one turn)
- Draw modifier (e.g. start each combat with an extra card in hand)
- Energy modifier (e.g. +1 energy every other turn)
- Defensive trigger (e.g. gain block when you take unblocked damage)

## Notes

Named in FONT vocabulary — "Ardour Stone," "The Weld's Promise," "Star Path Token," etc. Design at least one relic that feels like it came from The Kindled and one that feels like it came from The Weld (even if Fae isn't named in-app, the object's weight and texture can carry that lineage).
