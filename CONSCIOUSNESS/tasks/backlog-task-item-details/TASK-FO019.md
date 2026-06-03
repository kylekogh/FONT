---
id: TASK-FO019
status: pending
priority: p2
story_id: STORY-FO006
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# TASK-FO019: Build death and victory screens with run summary stats

## What

When the player dies or beats the boss, the run ends cleanly with a summary screen — not a crash, not a blank page, not a silent return to the start. Both endings get a moment. Implements WIN-1.

## Done when

- **WIN-1 satisfied:** Death and victory both terminate the run cleanly with a summary screen
- Death screen shows: cause of death (enemy that killed you), floor/node reached, cards in deck, run duration or turns
- Victory screen shows: boss defeated, run stats (cards drafted, relics acquired, enemies defeated)
- Both screens offer a "Start new run" option that correctly resets all state
- Neither screen has a dead end (no way to exit back to play)
- Summary data is accurate (not hardcoded placeholder values)

## Notes

In FONT terms: death is not shameful, it's information. The death screen should not punish the player emotionally — it should be a clean record of the run. Tone: tired-but-genuine, like Sora itself. The victory screen is the earned moment — it doesn't need fanfare, but it should feel real. Both screens are the last thing the player sees before starting again; they set the mood for the next run.
