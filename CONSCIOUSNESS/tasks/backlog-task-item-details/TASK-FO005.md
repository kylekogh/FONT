---
id: TASK-FO005
status: pending
priority: p1
story_id: STORY-FO001
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO004
---

# TASK-FO005: Build card draft / reward screen (post-combat card selection)

## What

After each combat encounter the player is shown a draft screen offering N cards (typically 3) to choose from. One is added to the deck permanently. This is how the deck grows across a run. Implements acceptance criterion C-2.

## Done when

- **C-2 satisfied:** After a combat encounter resolves, a draft/reward screen is shown
- Screen displays N card options (cards drawn from the available pool, weighted appropriately)
- Player selects one; it is added permanently to their deck for the rest of the run
- Player can skip (no card taken) — this should be possible even if penalized
- Returning from the draft screen correctly resumes the run at the map/node view
- The screen handles the Kindled card pool correctly (faction-appropriate card weighting)

## Notes

The card pool offered should skew toward the player's faction (The Kindled for the demo) while including some neutral/cross-faction options. Don't implement rarity tiers for the demo — a flat pool with sensible weights is sufficient.
