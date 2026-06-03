---
id: TASK-FO003
status: pending
priority: p1
story_id: STORY-FO001
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO002
blocks: TASK-FO004,TASK-FO006,TASK-FO017
---

# TASK-FO003: Define card data schema (cost, effect, type, faction, flavor text)

## What

Define the data model for a card. This schema is the ground truth everything else — the card renderer, the effect system, the draft screen, the Kindled card set — builds on. Must be stable before card authoring begins.

## Fields to define

At minimum:
- `id` — unique identifier
- `name` — display name
- `cost` — energy cost to play
- `type` — attack / skill / power (or equivalent)
- `effect` — structured representation of what the card does
- `faction` — which faction this card belongs to
- `flavor` — flavor text (FONT canon voice)
- `upgraded` — whether this is the upgraded version (or a flag pointing to the upgrade)

## Done when

- The card data schema is documented (in a design doc, a TypeScript type, or an equivalent formal definition depending on the chosen tech stack)
- The schema covers all effect types needed for 30 cards (C-3) and 15+ Kindled cards (FONT-1)
- At least 3 sample cards are written using the schema to validate it works

## Notes

The effect field is the hard part — needs to be structured enough for the engine to execute it, but flexible enough for 30 distinct cards. Don't over-engineer: a simple tagged union or action list is fine for a demo scope.
