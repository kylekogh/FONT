---
id: TASK-FO002
status: done
priority: p1
story_id: STORY-FO001
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocks: TASK-FO003
---

# TASK-FO002: Tech stack ADR — choose framework before any build work begins

## What

Author an Architecture Decision Record documenting the chosen tech stack for the roguelike deckbuilder demo. This decision gates all implementation work — no build tasks should begin until it is closed.

## Candidates to evaluate

- **Single HTML file (inline CSS/JS)** — consistent with font-fork.html. No build step. Gets unwieldy with 30+ card types and a complex combat loop.
- **React + Vite** — component model (Card, Hand, CombatTracker as discrete components), state updates automatically, build step required but manageable for a demo scope.
- **Phaser** — browser game engine with scenes, sprite management, built-in input/drag. Worth it only if animation quality is a demo priority.

## Done when

- A `CONSCIOUSNESS/architectural-decisions/ADR-FO001-tech-stack.md` file exists
- It records: the decision, the alternatives considered, the rationale, and any known consequences
- Kyle has signed off on the decision

## Notes

From DIRECT-FO001 mitigations: "Tech stack ADR should be the first task created under this directive." This is the first task. Do not begin TASK-FO003 or any build work until this is resolved.
