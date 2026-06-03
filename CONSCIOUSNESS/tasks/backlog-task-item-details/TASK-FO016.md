---
id: TASK-FO016
status: pending
priority: p2
story_id: STORY-FO004
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO012
---

# TASK-FO016: Build card upgrade mechanic at rest sites

## What

At rest/shop nodes, the player can upgrade a card in their deck. An upgraded card is permanently improved for the rest of the run — better numbers, an extra effect, or reduced cost. Implements PLR-2.

## Done when

- **PLR-2 satisfied:** Card upgrade mechanic available at rest sites or shops
- At rest nodes, the player can select one card from their deck to upgrade
- Upgraded cards are visually distinct from base versions (a marker, highlight, or name suffix)
- Each of the 30 base cards has a defined upgraded version (or a rule for how upgrades work generically)
- Upgrading is a one-time action per rest node (can't upgrade multiple cards per rest)

## Notes

The upgrade doesn't need to be mechanically complex — "deal 6 instead of 4" or "cost 1 instead of 2" is sufficient for each card. The important thing is that the choice matters and the improvement persists. Don't implement a forge/crafting system; a simple upgrade-one-card selection screen is correct for demo scope.
