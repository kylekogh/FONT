---
id: TASK-FO024
status: pending
priority: p1
story_id: STORY-FO008
directive_id: DIRECT-FO002
created: 2026-06-03
updated: 2026-06-03
blocks: TASK-FO025
---

# TASK-FO024: Research TWA vs Capacitor for HTML-to-APK packaging

## What

An ADR (Architecture Decision Record) choosing the approach for packaging the FONT HTML app as an Android APK. Two main paths: Trusted Web Activity (TWA) or Capacitor. Pick the right one before building anything.

## The two options

**Trusted Web Activity (TWA):**
- Wraps an existing hosted web URL in a native Chrome shell
- Minimal code changes — the app runs exactly as it does in the browser
- Requires: a hosted HTTPS URL (already have — Cloudflare Pages), a `/.well-known/assetlinks.json` file on the domain, and a thin Android project (can be generated with Bubblewrap CLI)
- Play Store compliant ✓
- Offline: only if the app has a service worker
- Best for: "ship the website as an app" with minimal overhead

**Capacitor (Ionic):**
- Wraps the HTML/JS files in a native WebView shell bundled with the APK
- Works offline by default (files are bundled, not hosted)
- Gives access to native APIs (camera, filesystem, haptics) if needed
- More setup: Node toolchain, Android Studio, Gradle build
- Best for: apps that need native features or must work offline

## Done when

- An ADR exists at `CONSCIOUSNESS/architectural-decisions/ADR-FO002-apk-packaging.md`
- The ADR names the chosen approach with clear rationale
- The ADR documents any prerequisites (Play Store dev account, domain verification, etc.)
- Kyle has confirmed the decision

## Recommendation (preliminary)

**TWA is almost certainly right for this project.** The app is already hosted on Cloudflare Pages, the HTML file is the source of truth, and the demo scope doesn't need native APIs. Bubblewrap CLI can generate the Android project in ~30 minutes. The only open question is offline support — if the demo needs to work without internet, Capacitor wins; if browser-only is fine, TWA wins.
