---
id: STORY-FO002
status: draft
priority: p1
quarter: Q3-2026
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO002: Combat engine and enemy AI

## Goal

Turn-based combat that feels complete: the player acts with energy and cards, enemies signal intent and execute actions, and status effects create meaningful decisions. The core loop a deckbuilder lives or dies by.

## Acceptance criteria (from directive)

- **CMB-1** — Enemy intent visible before player acts; enemy executes action at end of player turn
- **CMB-2** — Status effects (block, weak, vulnerable, burn or equivalent) implemented and displayed
- **CMB-3** — At least 8 distinct enemies implemented with varied behavior patterns

## Tasks

- **TASK-FO007** — Implement turn-based combat loop
- **TASK-FO008** — Build enemy intent display
- **TASK-FO009** — Implement status effects
- **TASK-FO010** — Design and implement 8 distinct enemy behavior patterns

## Sequencing

TASK-FO004 (card cycle) → TASK-FO007 (combat loop needs playable cards)  
TASK-FO007 → TASK-FO008, TASK-FO009, TASK-FO010 (all depend on the combat loop existing)

## Notes

Enemy behaviors (TASK-FO010) should include the boss at minimum — coordinate with TASK-FO013 (boss encounter). At least one enemy should use status effects so CMB-2 is exercised in play.
