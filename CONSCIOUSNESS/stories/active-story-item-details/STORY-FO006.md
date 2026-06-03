---
id: STORY-FO006
status: draft
priority: p2
quarter: Q3-2026
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO006: UI, tooltips, and run summary screens

## Goal

The demo is playable without instructions and requires no setup steps. Every card effect is readable in-app via tooltip. Win and death both land cleanly with a summary screen. The experience from fresh-open to run-end has no dead ends.

## Acceptance criteria (from directive)

- **WIN-1** — Death and victory both terminate the run cleanly with a summary screen
- **UI-1** — All card effects readable via tooltip; no effect requires external documentation
- **UI-2** — Playable from a fresh browser/desktop open with no setup steps

## Tasks

- **TASK-FO019** — Build death and victory screens with run summary stats
- **TASK-FO020** — Implement card and relic tooltips (all effects self-documenting)
- **TASK-FO021** — Verify zero-setup playability from a fresh browser open

## Sequencing

TASK-FO019 and TASK-FO020 can be built in parallel once the run structure exists.  
TASK-FO021 is a verification pass — runs last, after all other stories are green.

## Notes

UI-2 is a gate condition, not a feature. "No setup steps" means: no account, no instructions, no external resources needed. TASK-FO021 is essentially an end-to-end smoke test. Tooltip coverage (TASK-FO020) must cover both cards and relics — the acceptance criteria names both.
