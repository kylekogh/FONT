---
id: TASK-FO021
status: pending
priority: p2
story_id: STORY-FO006
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO019,TASK-FO020
---

# TASK-FO021: Verify zero-setup playability from a fresh browser open (UI-2)

## What

A verification pass — not a build task. Open the demo from a fresh browser with no prior state, no account, no instructions, and confirm a complete run (start → boss or death) is achievable without external help. Implements UI-2.

## Done when

- **UI-2 satisfied:** Playable from a fresh browser/desktop open with no setup steps
- A first-time player can reach the boss encounter (or die) without reading any documentation
- No login, account creation, file download, or configuration is required
- The starting state is clear: what the player has, what to do, where to go
- Any tutorial prompts or first-run hints are correct and non-blocking
- Tested on at least one platform that matches the demo's target deployment

## Checklist

- [ ] Open fresh incognito/private browser window
- [ ] Navigate to the demo URL or open the HTML file
- [ ] Complete one full run (death or victory) without asking for help
- [ ] Note any moment of confusion or ambiguity → fix before marking complete

## Notes

This task is a gate condition for the demo. If it fails, the demo is not shippable under the directive's terms. UI-2 is not polish — it is a hard criterion. The fix for most UI-2 failures is a clearer starting state or a tooltip, both of which should be addressed in earlier tasks. If this task fails, the fix belongs upstream (TASK-FO019 or TASK-FO020), not here.
