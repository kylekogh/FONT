---
id: TASK-FO011
status: pending
priority: p1
story_id: STORY-FO003
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO004
blocks: TASK-FO012,TASK-FO014
---

# TASK-FO011: Build navigable node map or path sequence from start to boss

## What

The run's structure: a map (branching paths) or a linear node sequence that takes the player from the start of a run to the boss encounter. The player can see what's ahead and make routing choices. Implements RUN-1.

## Done when

- **RUN-1 satisfied (partial):** A navigable structure exists from start to boss with at least 3 node types
- The map renders all nodes and connections the player can see
- The player can select a node and navigate to it
- Visited nodes are marked; available next-nodes are visually distinct from locked ones
- The boss node is at the end and is always reachable
- Minimum path length is sufficient for a meaningful run (suggest 10–15 nodes)

## Notes

Branching is not required for the demo — a linear sequence with occasional choice points is sufficient for RUN-1. Resist adding a full branching map if a simpler structure passes the criteria. The map's primary job is to give the player a sense of the run's shape and forward momentum.
