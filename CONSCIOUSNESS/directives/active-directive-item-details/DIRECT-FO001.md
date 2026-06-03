---
id: DIRECT-FO001
status: in_progress
priority: p1
quarter: Q3-2026
created: 2026-06-03 00:00:00.000 gmt
updated: 2026-06-03 00:00:00.000 gmt
authored_by: Kyle
---

# DIRECT-FO001: Ship a feature-complete roguelike deckbuilder demo

## Why

FONT is a world-building and narrative project. A playable roguelike deckbuilder set within the FONT universe is the most direct way to demonstrate that the lore, factions, and mechanics have depth worth exploring. A demo — not a toy, not a prototype, but a feature-complete slice — proves that the world translates into a game system that is fun, legible, and worth building further.

A demo also creates a concrete deliverable: something shippable, sharable, and playable from start to finish that can generate feedback and momentum for the larger project.

## What

A self-contained roguelike deckbuilder demo set in the FONT universe, playable from a fresh start to a run-end (win or death) with no dead ends, missing systems, or placeholder content.

**Core systems required:**

1. **Card system** — cards with costs, effects, and faction identity; a starting deck and draft/reward mechanics to grow it
2. **Combat loop** — turn-based combat with energy, draw, play, end-turn cycle; enemies with intent display
3. **Run structure** — a map or node sequence (encounters, events, rest sites, shops, boss) that constitutes a full run
4. **Player state** — health, energy, relics/items that persist across encounters; upgrades
5. **Enemy roster** — a set of enemies (including at least one boss) with distinct behaviors
6. **Win/loss** — clear run-end states; death screen with stats, win screen with run summary
7. **UI/UX** — playable without instructions; tooltips on cards and relics; clear feedback on all actions

**FONT integration:**

- At least one playable faction from the FONT world (cards, aesthetics, flavor text reflecting that faction's identity)
- Lore surface — card names, flavor text, and enemy names grounded in FONT canon
- Visual identity consistent with FONT's established tone

## Done when

- [ ] **C-1** — Card system: player can draw, play, and discard cards; energy resets each turn; hand limit enforced
- [ ] **C-2** — Card system: draft/reward screen offers card selection after each combat encounter
- [ ] **C-3** — Card system: at least 30 distinct cards implemented with correct effects
- [ ] **CMB-1** — Combat: enemy intent visible before player acts; enemy executes action end of player turn
- [ ] **CMB-2** — Combat: status effects (block, weak, vulnerable, burn, or equivalent) implemented and displayed
- [ ] **CMB-3** — Combat: at least 8 distinct enemies implemented with varied behavior patterns
- [ ] **RUN-1** — Run: map or node path navigable from start to boss; at least 3 node types (encounter, event, rest/shop)
- [ ] **RUN-2** — Run: at least one boss encounter with a multi-phase or unique mechanic
- [ ] **RUN-3** — Run: run state persists correctly between encounters (HP, deck, relics)
- [ ] **PLR-1** — Player: at least 5 relics implemented that modify run behavior in meaningful ways
- [ ] **PLR-2** — Player: card upgrade mechanic available at rest sites or shops
- [ ] **WIN-1** — Win/loss: death and victory both terminate the run cleanly with a summary screen
- [ ] **UI-1** — UI: all card effects readable via tooltip; no effect requires external documentation to understand
- [ ] **UI-2** — UI: playable from a fresh browser/desktop open with no setup steps
- [ ] **FONT-1** — FONT integration: at least one fully realized faction with cohesive card set (15+ cards) and flavor text
- [ ] **FONT-2** — FONT integration: enemy names, event text, and card flavor grounded in FONT canon

## Stories

- **STORY-FO001** — Card system and deck management
- **STORY-FO002** — Combat engine and enemy AI
- **STORY-FO003** — Run structure and map generation
- **STORY-FO004** — Relics and player progression
- **STORY-FO005** — The Kindled — first faction implementation
- **STORY-FO006** — UI, tooltips, and run summary screens

## Risks

- **R-1 (high)**: Scope creep — roguelike deckbuilders are systems-dense. Demo must stay scoped to one faction and one run arc; resist adding factions or card sets until C-3, CMB-3, RUN-2 are done.
- **R-2 (medium)**: FONT canon coherence — card and enemy flavor must align with established lore (factions, terminology, tone). Requires referencing existing FONT materials during content authoring.
- **R-3 (low)**: Tech stack choice gates all subsequent work. Decision should happen before any story work begins.

## Mitigations

- M-R-1: Acceptance criteria above are the hard scope boundary. Any addition requires removing something else.
- M-R-2: FONT-1 and FONT-2 criteria are explicit gate conditions — flavor is not optional decoration.
- M-R-3: Tech stack ADR should be the first task created under this directive.

## References

- `CONSCIOUSNESS/identity-vision-mission.md` — FONT identity and universe principles
- Factions established so far: reference project lore files for faction identities
