---
id: TASK-FO009
status: pending
priority: p1
story_id: STORY-FO002
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO007
---

# TASK-FO009: Implement status effects (block, weak, vulnerable, burn or equivalent)

## What

Status effects that modify combat math and create tactical decisions. The minimum set: block (absorbs incoming damage), weak (reduces outgoing damage), vulnerable (increases incoming damage), and one offensive status (burn, bleed, or equivalent — damage over time or recurring debuff). Implements CMB-2.

## Done when

- **CMB-2 satisfied:** At least 4 status effects implemented and displayed
- Block absorbs damage and clears at turn start (standard deckbuilder behavior)
- Weak reduces outgoing damage by a defined % (standard: 25% reduction)
- Vulnerable increases incoming damage by a defined % (standard: 50% increase)
- One damage-over-time or recurring debuff status (burn/bleed/equivalent — pick one, name it in FONT terms)
- All active status effects are displayed on the relevant combatant with current stack count
- Statuses are applied by cards and by enemy actions where appropriate

## Notes

Name statuses in FONT vocabulary, not genre defaults. "Burn" works if it fits the Kindled theme (a fighter whose Spark runs hot). "Bleed" or "Fray" or "Pressure" could work too — choose the one that sounds like it belongs in Sora. Whatever you pick, it must be self-evident from the tooltip what it does (UI-1).
