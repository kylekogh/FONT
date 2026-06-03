---
id: STORY-FO003
status: draft
priority: p1
quarter: Q3-2026
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO003: Run structure and map generation

## Goal

A complete run arc: a navigable map (or node sequence) from a fresh start through encounters, events, and rest sites to a boss. State persists correctly between nodes. The run has a shape the player can see and choose through.

## Acceptance criteria (from directive)

- **RUN-1** — Map or node path navigable from start to boss; at least 3 node types (encounter, event, rest/shop)
- **RUN-2** — At least one boss encounter with a multi-phase or unique mechanic
- **RUN-3** — Run state persists correctly between encounters (HP, deck, relics)

## Tasks

- **TASK-FO011** — Build navigable node map or path sequence
- **TASK-FO012** — Implement 3 node types (encounter, event, rest/shop)
- **TASK-FO013** — Design boss encounter with multi-phase or unique mechanic
- **TASK-FO014** — Implement run state persistence across encounters

## Sequencing

TASK-FO004 (playable card cycle) → TASK-FO011 (map needs a combat to land on)  
TASK-FO011 → TASK-FO012 (node types require the map structure)  
TASK-FO011 → TASK-FO014 (persistence requires knowing what nodes exist)  
TASK-FO007 (combat loop) → TASK-FO013 (boss uses the combat engine)

## Notes

Scope risk R-1 applies here — resist adding a second map branch or extra node types until RUN-1, RUN-2, RUN-3 are all green. The boss (TASK-FO013) is the demo's climax; it needs one distinctive mechanic, not three.
