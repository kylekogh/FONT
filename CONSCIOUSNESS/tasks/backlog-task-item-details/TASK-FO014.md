---
id: TASK-FO014
status: pending
priority: p1
story_id: STORY-FO003
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO011
---

# TASK-FO014: Implement run state persistence across encounters (HP, deck, relics)

## What

Between encounters, the player's state carries over correctly: current HP (not reset), their accumulated deck (all cards drafted so far), and any relics acquired. Implements RUN-3.

## Done when

- **RUN-3 satisfied:** HP, deck, and relics all persist correctly between all encounter types
- HP does not reset between encounters unless a rest/heal effect explicitly restores it
- Deck includes all cards from starting deck plus all drafts; no cards are lost between encounters
- Relics are active and their effects apply for the full run from acquisition forward
- State is correct after: encounter → map → event → map → encounter sequences
- No state corruption after a rest/shop node

## Notes

This is where persistent-state bugs are most likely to hide. Test the HP-persistence explicitly: if the player enters a fight at 40 HP and wins, they should enter the next fight at 40 HP (minus any damage, plus any healing at rest). Don't conflate "reset energy each turn" with "reset HP each encounter."
