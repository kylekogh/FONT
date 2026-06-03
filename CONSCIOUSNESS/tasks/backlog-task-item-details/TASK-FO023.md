---
id: TASK-FO023
status: pending
priority: p1
story_id: STORY-FO007
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO022
---

# TASK-FO023: Define class-specific starting decks for all 6 classes

## What

Each of the 6 classes (Bonded, Forged, Augmented, Hollow, Manifold, Delver) gets a starting deck — the 10 cards a player begins the run with before any drafting. The starting deck defines the class's feel in the first 2–3 encounters and sets up the draft decisions that follow.

## Done when

- All 6 classes have a documented starting deck (10 cards each)
- Each starting deck is mechanically distinct — no two classes feel the same in the first encounter
- Starting decks are grounded in TASK-FO022's lore-to-mechanics mapping (each card choice has a world reason)
- The Kindled starting deck is fully specified and implemented for the demo (the other 5 are documented for future use)
- All 10 starting cards for The Kindled exist in the card pool (TASK-FO006)

## Starting deck design notes

**The Bonded (demo-adjacent — similar to a default Kindled fighter):**
- Balanced: 4 attack, 3 skill, 2 power, 1 utility
- Spirit is steady — the deck reflects that: reliable, no feast-or-famine

**The Hollow:**
- Volatile: more raw damage, less block — the bond broke, the restraint went with it
- Higher ceiling, lower floor — big turns or bad ones

**The Forged:**
- Foci-defined: the starting deck is weaker but the starting item (focus) is stronger than any other class's relic
- The item IS the character; the cards support it

**The Delver:**
- Depth-scaling: starting cards have a "Depth" keyword — they improve as the run goes deeper
- Weak in early encounters, strongest near the boss

## Notes

For the demo, only The Kindled starting deck needs to be implemented. The other five are designed here and held in reserve for DIRECT-FO002 (full game). Don't build what isn't needed for the demo — document it and move on.
