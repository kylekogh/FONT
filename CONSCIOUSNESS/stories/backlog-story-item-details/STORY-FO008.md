---
id: STORY-FO008
status: draft
priority: p1
quarter: Q4-2026
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
---

# STORY-FO008: Android / Play Store packaging

## Goal

The FONT deckbuilder demo, packaged as an Android APK and downloadable from the Google Play Store. The game already runs in a browser — this story gets it onto phones without rewriting it.

## Why

Kyle's vision: a mobile game, accessible anywhere. The existing HTML/JS single-file architecture is the asset — the goal is to wrap it correctly, not rebuild it.

## Acceptance criteria

- The app is downloadable and installable from the Google Play Store
- The first-run experience on Android matches the browser experience (no setup steps)
- Tested on at least one physical Android device
- Play Store listing has a description, screenshots, and content rating

## Tasks

- **TASK-FO024** — Research TWA vs Capacitor (decide the packaging approach)
- **TASK-FO025** — Package and submit to Play Store

## Sequencing

Blocked by DIRECT-FO001 completing — the demo must be feature-complete before packaging. Don't package an incomplete game.

## Notes

The app is already deployed on Cloudflare Pages (from the git history). TWA (Trusted Web Activity) is likely the lightest path — it wraps the existing hosted URL in a native shell, requires a `assetlinks.json` on the domain, and has minimal build overhead. Capacitor is heavier but gives more native access if needed later. See TASK-FO024 for the full tradeoff.
