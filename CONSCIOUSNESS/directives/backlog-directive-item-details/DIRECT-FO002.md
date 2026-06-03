---
id: DIRECT-FO002
status: backlog
priority: p1
quarter: Q4-2026
created: 2026-06-03
updated: 2026-06-03
authored_by: Kyle
---

# DIRECT-FO002: Grow the demo into a full shipped game

## Why

The demo (DIRECT-FO001) proves the world translates. This directive takes that proof and turns it into a product: distributed on the Play Store, expanded to all five factions, rewarding repeat play through meta-progression, and accompanied by an AI that knows the FONT world and speaks its language.

Kyle's vision in his own words: *"Each time you lose you gain points for an outside-game meta currency. The lore files are there. It's about shaping them into a playable game — this is an ability, this is a class, this is a spirit. And the project chat knows exactly what all this is."*

## What

1. **Play Store distribution** — package the HTML/JS demo as an Android APK (via Trusted Web Activity or Capacitor) and submit to the Google Play Store. Possibly iOS via App Store in the future.

2. **All five factions playable** — expand beyond The Kindled to all five factions (The Kindled, The Cult of Mugen, The Veneration of the Makami Shu, The Guild, The Weld). Each faction is a distinct deck identity with its own card set, starting relics, and run flavor.

3. **Roguelite meta-progression** — an outside-game layer where each run (win or loss) earns a meta-currency. That currency unlocks permanent improvements, new starting options, or lore fragments. Losing is always progress.

4. **AI companion integration** — an in-game chat companion backed by the Claude API with the FONT world as its context. The companion knows the lore, the factions, the dungeon — and speaks in FONT's voice. API cost is the player's to manage (bring-your-own-key or a managed service tier).

## Done when

- [ ] App is downloadable from the Google Play Store and playable from first open
- [ ] All five factions are playable with distinct card sets (15+ cards each)
- [ ] Meta-currency earned after every run; at least 3 unlockable progression tracks
- [ ] AI companion responds in-character to in-run events using FONT lore as context
- [ ] Full run (any faction) from fresh install to boss or death with no setup required

## Stories

- STORY-FO008: Android / Play Store packaging
- STORY-FO009: AI companion integration
- STORY-FO010: Meta-progression layer
- *(Additional faction stories to be authored — Cult of Mugen, Veneration, Guild, Weld)*

## Risks

- **R-1 (high):** API cost for AI companion. Bring-your-own-key is the safest path; a managed tier requires a monetization decision.
- **R-2 (medium):** Play Store review process. TWA requires a verified domain; Capacitor adds a build toolchain.
- **R-3 (medium):** Scope — five factions is a large content lift. Each faction is a full story (15+ cards, enemies, events). Sequence carefully after the demo ships.

## References

- DIRECT-FO001 — the demo that gates this work; ship it first
- FONT_lore.md Pillar 4 — all five factions are designed here
- Issue #2 — Kyle's recorded vision statement
