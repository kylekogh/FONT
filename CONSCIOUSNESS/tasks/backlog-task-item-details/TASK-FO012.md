---
id: TASK-FO012
status: pending
priority: p1
story_id: STORY-FO003
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO011
blocks: TASK-FO016
---

# TASK-FO012: Implement 3 node types: encounter, event, and rest / shop

## What

Three distinct node types on the map, each with different behavior. Encounter = combat. Event = a narrative moment with a choice and consequence. Rest/shop = a place to upgrade cards or buy a relic. Completes RUN-1.

## Done when

- **RUN-1 fully satisfied:** Encounter, event, and rest/shop nodes all function
- **Encounter node** — launches a combat encounter; on completion offers a card draft (TASK-FO005)
- **Event node** — presents a FONT-flavored narrative prompt with 2–3 choices and distinct outcomes (HP loss/gain, card add/remove, relic, etc.)
- **Rest/shop node** — offers card upgrade (TASK-FO016) and/or a relic purchase (TASK-FO015); player has limited actions here
- All 3 node types correctly complete and return the player to the map

## Notes

Event text must be in FONT-canon voice — coordinate with TASK-FO018 for content. Event outcomes should have genuine tradeoffs; an event where every option is fine doesn't create interesting decisions. At least one event should reference the Kindled or the Star Path to reinforce the faction theme.
