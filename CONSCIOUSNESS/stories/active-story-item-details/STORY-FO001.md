---
id: STORY-FO001
status: draft
priority: p1
quarter: Q3-2026
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO001: Card system and deck management

## Goal

A working card system: the player can hold cards in hand, play them using energy, and manage a growing deck across a run. This is the mechanical foundation everything else builds on.

## Acceptance criteria (from directive)

- **C-1** — Player can draw, play, and discard cards; energy resets each turn; hand limit enforced
- **C-2** — Draft/reward screen offers card selection after each combat encounter
- **C-3** — At least 30 distinct cards implemented with correct effects

## Tasks

- **TASK-FO002** — Tech stack ADR (gates all build work; first task)
- **TASK-FO003** — Define card data schema
- **TASK-FO004** — Implement draw / play / discard cycle
- **TASK-FO005** — Build card draft / reward screen
- **TASK-FO006** — Author 30 distinct cards

## Sequencing

TASK-FO002 → TASK-FO003 → TASK-FO004 → TASK-FO005 (draft screen requires a working hand)  
TASK-FO003 → TASK-FO006 (card authoring requires the schema)

## Notes

The tech stack ADR (TASK-FO002) is directive-level — its outcome gates everything. Resolve it before any other build task begins. See DIRECT-FO001 mitigations: R-3.
