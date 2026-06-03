---
id: TASK-FO020
status: pending
priority: p2
story_id: STORY-FO006
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# TASK-FO020: Implement card and relic tooltips (all effects self-documenting in-app)

## What

Every card and relic in the game has a tooltip that explains what it does. No effect should require the player to check an external document, wiki, or readme. Implements UI-1.

## Done when

- **UI-1 satisfied:** All card effects readable via tooltip; no effect requires external documentation
- Every card has an in-app tooltip with: name, cost, effect description, type, faction
- Every relic has an in-app tooltip with: name, effect description, and acquisition hint
- Status effect tooltips explain what the status does when hovered/tapped
- Tooltip trigger is consistent and discoverable (hover on desktop, tap/long-press on mobile if applicable)
- All 30 cards are covered; all 5 relics are covered; all status effects are covered

## Notes

Tooltip copy must use FONT vocabulary, not genre jargon. "Gain 5 Block" is fine; "Gain 5 Armor (reduces incoming damage)" is better if the term "Block" isn't already established. The goal is zero ambiguity for a first-time player. Test by asking: if someone has never played a deckbuilder, can they understand every card from the tooltip alone?
