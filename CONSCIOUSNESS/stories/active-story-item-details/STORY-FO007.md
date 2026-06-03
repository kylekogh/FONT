---
id: STORY-FO007
status: draft
priority: p1
quarter: Q3-2026
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO007: Lore-to-mechanics design bridge

## Goal

A design document that translates FONT's existing lore into card game language — so every mechanical decision in the deckbuilder (card effects, class identities, starting decks, enemy archetypes) has a FONT-world grounding, not a genre-default origin.

This is the bridge between FONT_lore.md and the build tasks. It should be the reference document every card author and every mechanic designer reaches for first.

## Why this exists

Kyle's vision (Issue #2): *"The information that I need — this is an ability, this is a class, this is a spirit, this is a thing — actually direct it to know what each of these things mean."*

The lore is complete. The game is the translation. This story produces the translation guide.

## Acceptance criteria

- A design document exists mapping each FONT spirit type / Spark inclination to a card archetype (aggro, control, combo, tempo, etc.)
- All 6 classes (Bonded, Forged, Augmented, Hollow, Manifold, Delver) have defined starting deck compositions
- The Kindled faction's card identity is formally derived from the lore (not invented for the game)
- Enemy archetypes are named in FONT vocabulary and grounded in existing factions

## Tasks

- **TASK-FO022** — Map FONT spirits/classes/abilities to card game language
- **TASK-FO023** — Define class-specific starting decks for all 6 classes

## Notes

This story should be completed before or in parallel with STORY-FO005 (Kindled implementation) — the Kindled card set should be authored against this design doc, not before it. The doc lives in the repo (not just in CONSCIOUSNESS) so it's a persistent creative reference.
