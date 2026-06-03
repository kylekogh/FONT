---
id: TASK-FO022
status: pending
priority: p1
story_id: STORY-FO007
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocks: TASK-FO023
---

# TASK-FO022: Map FONT spirits, classes, and abilities to card game language

## What

A design document that translates FONT's world-building into deckbuilder mechanics. This is the translation layer — every card effect, class identity, and enemy archetype should be traceable back to something in FONT_lore.md.

Kyle's intent (Issue #2): *"This is an ability, this is a class, this is a spirit, this is a thing — actually direct it to know what each of these things mean."*

## The mapping to produce

**Sparks → card archetypes:**
- Combustion / Momentum Sparks → aggro (high damage, fast)
- Density / Gravity Sparks → control (block-heavy, slow down enemies)
- Sound / Precision Sparks → combo (set up conditions, then execute)
- Foresight / Pattern Sparks → tempo (read ahead, react efficiently)
- Creation Sparks → utility / wildcard (flexible, builds toward something)

**Classes → starting deck identity:**
- The Bonded — balanced starter (strong bond = steady early game)
- The Forged — tool-based (created item defines the deck's core mechanic)
- The Augmented — hybrid (craft-boosted damage with Spark limitations)
- The Hollow — high risk/reward (bond broke; more power, less versatility)
- The Manifold — multi-spirit (wider but shallower effects)
- The Delver — depth-focused (cards get stronger the deeper the run goes)

**Factions → deck identities:**
- The Kindled → expression-through-combat (building toward Ascended state)
- The Cult of Mugen → Tempering Loop (power builds with conviction, breaks with doubt)
- The Veneration → precision and relics (Saint tags as one-shot powerful effects)
- The Guild → contract/bounty mechanics (rewards for specific combat conditions)
- The Weld → foci-based (the item IS the card; Builder's emotional state matters)

## Done when

- A `FONT-mechanics-design-bridge.md` file exists in the repo root
- All three mappings above are documented with at least 2–3 card-effect examples each
- The Kindled section is detailed enough for TASK-FO017 to use as its direct reference
- Kyle has reviewed and confirmed the translations feel right

## Notes

This is a design task, not a build task. The output is a document, not code. It should be written in FONT's own vocabulary throughout — no genre jargon like "aggro" or "control" needs to appear in-game, but the design doc can use it as shorthand for us to communicate intent.
