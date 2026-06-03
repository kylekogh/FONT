---
id: TASK-FO029
status: pending
priority: p1
story_id: STORY-FO010
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO028
---

# TASK-FO029: Implement outside-game meta-progression layer

## What

Build the meta-progression system designed in TASK-FO028: the currency tracking, the earning calculation at run end, the progression track UI, and the unlock flow.

## Done when

- Meta-currency is earned and recorded at the end of every run (win or loss)
- The earning formula runs correctly (deeper runs, longer runs, wins all award appropriately)
- Currency and unlock state persist across sessions (localStorage key distinct from run state)
- The progression screen is accessible from the main menu (not buried)
- At least 3 items are unlockable across the 3 tracks
- Unlocked items are active in subsequent runs (not just cosmetic checkmarks)
- The lore fragment unlocks display correctly in a readable format

## Implementation notes

- Use a separate localStorage key from the run state — meta-state must not be wiped when a run resets
- The run-end screen (TASK-FO019) should feed into this: show "you earned X Ardour this run" before showing the summary
- Unlocks should apply immediately — no restart required
- Keep the progression screen simple: currency balance, three tracks, unlock buttons with costs. No menus inside menus.

## Notes

The meta-layer is what turns the demo into a game people return to. It doesn't need to be elaborate — even a small number of unlocks makes a run feel like it was worth taking. The lore fragment track is the one that matters most for the FONT world: it's the mechanic that says *"the dungeon has a history and you can find it if you go deep enough, long enough."*
