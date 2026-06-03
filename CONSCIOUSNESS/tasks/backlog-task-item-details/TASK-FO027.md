---
id: TASK-FO027
status: pending
priority: p1
story_id: STORY-FO009
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO026
---

# TASK-FO027: Build in-game AI companion chat panel

## What

The UI and integration: a companion panel in the game that lets the player talk to the AI companion and see its responses. Built against the spec from TASK-FO026.

## Done when

- A companion panel exists in the game UI (collapsible so it doesn't crowd the board)
- The player can type a message and receive a response in FONT voice
- The companion has run context: it knows what faction the player is, their current HP, what they just fought
- API key input is handled (if BYOK: a settings field to enter and save the key)
- The companion UI is consistent with FONT's visual identity (Midnight & Gold palette)
- Prompt caching is implemented correctly — the FONT lore context is cached, not resent every message
- Responses feel like the companion, not like a chatbot

## Implementation notes

- Use the Anthropic SDK (`@anthropic-ai/sdk` for JS)
- Attach run state to each message as a user-turn prefix (not in the system prompt, which is cached)
- Handle rate limits and API errors gracefully — if the companion can't respond, say so in FONT voice ("The connection frays. Try again.")
- Keep conversation history bounded — send last N turns only to avoid context blowout

## Notes

The companion is optional infrastructure — a player who doesn't use it loses nothing. Build the toggle to hide the panel entirely. The companion is for players who want to go deeper into the world, not a required tutorial. This is the mechanic that turns a game into a companion, and it should feel like the player discovered it, not like it was pushed on them.
