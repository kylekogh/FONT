---
id: TASK-FO010
status: pending
priority: p1
story_id: STORY-FO002
directive_id: DIRECT-FO001
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO007
---

# TASK-FO010: Design and implement 8 distinct enemy behavior patterns

## What

At least 8 enemies with mechanically distinct behaviors — not just different numbers on the same attack pattern. Variation should force the player to adapt their strategy. Implements CMB-3.

## Done when

- **CMB-3 satisfied:** At least 8 enemies with distinct behavior patterns exist and are playable
- No two enemies have functionally identical behavior (different names/values don't count)
- At least one enemy uses multi-hit attacks, one uses block/defend, one applies a status effect, one uses a buff
- The boss (TASK-FO013) counts as one of the 8 if it has a behavior pattern
- All enemies have FONT-canon names (coordinate with TASK-FO018)
- Enemy behavior is readable via intent display (TASK-FO008)

## Suggested behavior archetypes (starting point, not prescriptive)

1. Brawler — repeated attacks, no frills
2. Defender — alternates attack and high block
3. Striker — one big hit after a wind-up turn
4. Burner — applies burn/status and waits for it to tick
5. Swarmer — lower damage but frequent multi-hits
6. Drainer — attacks and removes energy or cards
7. Shielder — applies vulnerability or weak before attacking
8. Boss — multi-phase or unique mechanic (see TASK-FO013)

## Notes

Enemy names should feel Soran — earned, human, not fantasy-generic. Cross-reference with TASK-FO018 (FONT-canon content). A "Brawler" in Sora might be a Limit-Seeker who pushed past their rank; a "Defender" might be a Venerator Guard. Let the lore suggest the name.
