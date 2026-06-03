---
id: TASK-FO004
status: pending
priority: p1
story_id: STORY-FO001
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO003
blocks: TASK-FO005,TASK-FO007,TASK-FO011
---

# TASK-FO004: Implement draw / play / discard cycle with energy reset and hand limit

## What

The mechanical heart of the card system. The player starts each turn with a full energy pool, draws cards, plays them (spending energy), and discards them. At turn end, the hand clears and energy resets. Implements acceptance criterion C-1.

## Done when

- **C-1 satisfied:** Player can draw cards from their deck into their hand
- Hand limit is enforced (cards beyond the limit are discarded or not drawn)
- Playing a card spends its cost from the energy pool
- Cards that cannot be afforded are visually indicated as unplayable
- At end of turn: hand discards, draw pile shuffled into discard when empty, energy resets
- The cycle is stable across multiple turns without state corruption

## Notes

The shuffle-when-empty behavior (draw pile → shuffle discard → new draw pile) is the one place save-state bugs tend to hide. Test it explicitly. Don't add exhaust or retain mechanics until C-1 is clean — those are card-specific effects, not cycle mechanics.
