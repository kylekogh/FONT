---
id: TASK-FO025
status: pending
priority: p1
story_id: STORY-FO008
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
blocked_by: TASK-FO024
---

# TASK-FO025: Package app as Android APK and submit to Google Play Store

## What

Build the APK using the approach chosen in TASK-FO024 and go through the Play Store submission process: create the listing, upload the APK, pass review, and publish.

## Done when

- The app is live and downloadable from the Google Play Store
- It installs and runs correctly on at least one physical Android device
- First-run experience matches the browser: no setup, playable immediately
- Play Store listing includes: app description (in FONT voice), screenshots, content rating
- The Cloudflare Pages domain has `assetlinks.json` configured (if TWA)

## Play Store prerequisites (need before starting)

- [ ] Google Play Developer account ($25 one-time fee)
- [ ] App signed with a release keystore (generate and store securely)
- [ ] Privacy policy URL (required by Play Store even for games with no user data)
- [ ] At least 2 screenshots at Play Store required dimensions

## Notes

Play Store review typically takes 1–3 days for new apps. Content rating questionnaire will ask about violence — a deckbuilder with combat is likely PEGI 7 / Everyone 10+. The listing description should be written in FONT's own voice — not "a roguelike deckbuilder with X features" but something that conveys Sora, the dungeon, the Spark.
