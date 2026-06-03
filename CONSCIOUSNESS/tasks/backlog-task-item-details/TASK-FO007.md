---
id: TASK-FO007
status: pending
priority: p1
story_id: STORY-FO002
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO004
blocks: TASK-FO008,TASK-FO009,TASK-FO010,TASK-FO013
---

# TASK-FO007: Implement turn-based combat loop (draw, play, end-turn; enemy executes)

## What

The full combat encounter loop: player draws, plays cards with energy, ends their turn, then the enemy executes its queued action. This repeats until player or enemy HP hits zero. The combat loop is the engine all other combat tasks plug into.

## Done when

- Player draw → play → end-turn cycle is complete (C-1 dependency already satisfied by TASK-FO004; this task wires it into a combat context)
- Enemy takes a turn after the player's turn ends and executes its queued action
- Combat ends correctly when either side reaches 0 HP
- On player death: transitions to a death state (WIN-1 dependency; full screen built in TASK-FO019)
- On enemy defeat: transitions to reward state (card draft via TASK-FO005)
- No state corruption between turns or between consecutive encounters

## Notes

The enemy action queue (what the enemy will do next turn) is displayed as intent (TASK-FO008 wires in the UI). Don't build intent display here — just ensure the data structure for next-action exists and is set each turn. The loop itself is the goal.
