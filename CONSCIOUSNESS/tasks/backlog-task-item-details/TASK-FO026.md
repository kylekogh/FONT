---
id: TASK-FO026
status: pending
priority: p1
story_id: STORY-FO009
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
blocks: TASK-FO027
---

# TASK-FO026: Spec AI companion — API choice, FONT context prompt, cost model

## What

Design the AI companion before building it. Three decisions: which API, what context to give it, and how to handle cost. The output is a spec document and a tested draft system prompt.

## API choice

**Claude API (Anthropic) — recommended:**
- claude-haiku-4-5: fast and cheap (~$0.25/M input, $1.25/M output) — good for casual companion use
- claude-sonnet-4-6: better quality (~$3/M input, $15/M output) — worth it for key moments
- **Prompt caching is critical:** the FONT lore context (FONT_lore.md is ~30k tokens) is static. With caching, it's written once and cached — subsequent messages cost only the new input tokens. Cache TTL is 5 minutes; for an active session this means the lore context is effectively free after the first message.

**Cost model options:**
- **Bring-your-own-key (BYOK):** player enters their own Anthropic API key. Zero billing infrastructure. Players who care will set it up.
- **Managed tier:** Kyle pays for API calls, possibly gated behind a subscription or one-time purchase. Requires billing infrastructure.
- **Recommended for launch:** BYOK. Add managed tier later if demand justifies it.

## The context prompt to draft

The system prompt should include:
1. The FONT world identity (condensed from FONT_lore.md — spirits, Sora, the bond, the dungeon)
2. The companion's voice rules (aphantasia-precise, Soran sensory register, FONT vocabulary only)
3. What the companion knows about the current run (faction, current HP, depth reached, last encounter)
4. What the companion does NOT do (no breaking the fourth wall, no real-world references)

## Done when

- A spec doc exists at `CONSCIOUSNESS/architectural-decisions/ADR-FO003-ai-companion.md`
- A tested system prompt exists (tested against the actual Claude API — not hypothetical)
- The prompt produces companion output that passes the FONT voice check (aphantasia law, no scaffolding references)
- The cost model is decided and documented
- Kyle has confirmed the companion voice feels right

## Notes

The companion should not feel like a customer service bot. It should feel like a Soran binder who has seen things in the deep and is walking with you now. The "two people standing back to back" feeling from Pillar 1.2 is the model. It is present, it is real, and it does not explain itself.
