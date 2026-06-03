# The ZEN System — v0.1

*A solo oracle engine for people who want to feel a story, not solve one.*

**Designer:** Kyle Kogh
**Status:** v0.1 — architecture locked, numbers open to playtesting

---

## What ZEN is

ZEN is a self-contained solo oracle engine. Original top to bottom — no borrowed text
or tables. It runs underneath every companion in the suite and is designed to ship as
a standalone system in its own right.

The name comes from its purpose: a retreat from mechanical crunch that lets you feel a
story rather than manage it. Every decision in the system serves that principle. One
die. Pressure that builds and breaks on its own. An oracle that arrives already in the
body.

---

## 1. WEIGHT — the resolution spine

One value, **Weight**, tracks how hard the world is pressing on you right now.
It bends every answer and generates the story's arc on its own.

- **Range:** 1–5 in normal play. Starts at **2**.
- Reaching **6** triggers a **Break** (see §4) — it is not a stable state.

### Asking a question

1. State a yes/no question. Pick the odds: **Likely / Even / Unlikely**.
2. Roll **1d6**. Apply the odds step: Likely **+1**, Even **+0**, Unlikely **−1**.
3. Find the **margin**: `m = adjusted roll − Weight`.
4. Read the outcome:

| margin | outcome | |
|-------:|---------|-|
| **+3 or more** | **Yes, and** | it happens and overdelivers — *Weight eases by 1* |
| **+2** | **Yes** | it happens as hoped |
| **+1** | **Yes, but** | it happens, with a string attached |
| **0** | **Twist** | on the line — something turns; draw from the oracle — *Weight +1* |
| **−1** | **No, but** | it fails, but something small holds |
| **−2** | **No** | it does not happen — *Weight +1* |
| **−3 or less** | **No, and** | it fails and the situation worsens — *Weight +1* |

### Weight rises and falls

- **Any No or Twist:** Weight +1. Cracks compound.
- **Yes, and:** Weight −1 (floor 1). Real wins lighten the world.
- **A Respite / quiet beat:** Weight −1. The player's pacing lever.

Weight breathes. It is not a one-way ratchet.

### The probability curve

Even odds, flat roll, 1d6 against each Weight value:

| Weight | 1 | 2 | 3 | 4 | 5 | 6 | feel |
|-------:|---|---|---|---|---|---|------|
| **1** | Twist | Y-but | Yes | Y-and | Y-and | Y-and | world barely resists |
| **3** | No | N-but | Twist | Y-but | Yes | Y-and | genuinely contested |
| **5** | N-and | N-and | No | N-but | Twist | Y-but | grim — a 6 only gets you Yes-but |

Weight controls both *how often* you succeed and *how cleanly*. Quality of outcome
degrades with pressure, not just frequency. The Nos at high Weight push toward Break,
so a grinding situation naturally escalates to a climax. The engine generates an arc.

---

## 2. THE MEANING ORACLE — motion × charge

When a result carries a shade, when a Twist fires, or any time you want a prompt, the
oracle hands you the **felt shape of what happens** — not a noun to picture.

You already have the subject. You asked the question; you are in the scene. The oracle
supplies the motion and the texture. You wrap them around what you know.

Two tables, ordered **light → heavy**. Roll **1d12** on each.

### MOTION — what the moment does

| d12 | | d12 | |
|----:|-|----:|-|
| 1 | eases | 7 | tightens |
| 2 | opens | 8 | snags |
| 3 | draws near | 9 | frays |
| 4 | settles | 10 | presses |
| 5 | holds | 11 | gives way |
| 6 | turns | 12 | breaks |

### CHARGE — the texture of it

| d12 | | d12 | |
|----:|-|----:|-|
| 1 | warmth | 7 | friction |
| 2 | sweetness | 8 | salt |
| 3 | lightness | 9 | ache |
| 4 | hush | 10 | weight |
| 5 | hum | 11 | pressure |
| 6 | a held breath | 12 | cold |

Every entry lives in the body, the ear, or the skin. Nothing asks you to picture
anything. That is structural, not a feature bolted on.

---

## 3. COUPLING — Weight tints the draw

> **On each meaning roll, add `(Weight − 3)` and clamp to 1–12.**

- **Weight 1–2:** shift negative — draws lean toward *eases / warmth / lightness*.
  The world offers small mercies.
- **Weight 3:** no shift — the full range is live.
- **Weight 4–5:** shift positive — draws lean toward *presses / ache / cold*.
  Everything the oracle hands you is already grim.

In apps this happens silently. The player only notices the prompts darken as things
get worse. By hand: roll d12, add Weight−3, clamp to 1–12.

### Worked examples

**Weight 2, "do they let me in?", Even.**
Roll 5 → adjusted 5 → margin +3 → **Yes, and.** Weight eases to 1.
Draw (shift −1): Motion 5→4 *settles*, Charge 4→3 *lightness*.
→ *settles + lightness* — the resistance lifts cleanly; something in the room relaxes
around you.

**Weight 3, "do they trust me?", Even.**
Roll 3 → margin 0 → **Twist.** Weight to 4.
Draw (no shift): Motion 8 *snags*, Charge 6 *a held breath*.
→ *snags + a held breath* — something catches; the room goes still. Name what just
walked in.

**Weight 5, "can I force the door?", Even.**
Roll 2 → margin −3 → **No, and.** Weight to 6 → **Break.**
Draw (shift +2): Motion 8→10 *presses*, Charge 6→8 *salt*.
→ *presses + salt* — it doesn't give, and something closes around it, bitter. The
situation breaks open.

---

## 4. THE BREAK — when Weight hits 6

When a crack would push Weight from 5 to 6:

- The situation **breaks open.** Something permanent changes — a confrontation, a
  collapse, a decision that cannot be taken back.
- After it resolves, **Weight resets to 2.** The pressure is spent; the aftermath is
  not calm.

This gives the engine a natural rhythm: **build → break → ease → rebuild.** Pressure
means something because it has a ceiling that pays off.

---

## 5. THE TWIST

The Twist fires when a question lands exactly on the line (margin 0). It is not a
separate counter or a probability check — it is emergent from resolution. The
complication is woven into the act of asking. One fewer thing to track.

---

## 6. OPTIONAL — the Focus prompt

For moments when the player is genuinely blank, an optional **Focus** roll (1d6)
points the texture somewhere:

| d6 | focus |
|---:|-------|
| 1 | the bond — someone you're tied to |
| 2 | the body — yours, right now |
| 3 | the place — where you are |
| 4 | the past — something carried |
| 5 | a stranger — someone new |
| 6 | the thing you want |

Off by default. Surfaced only on request.

---

## 7. WHY IT WORKS

- **One die.** No opposed rolls, no pool management.
- **Composes cleanly.** Motion + charge nearly always parses. No nonsense pairs.
- **Arrives pre-grounded.** No abstraction-to-scene translation. The prompt lands in
  the body.
- **Tone-aware.** The oracle darkens with pressure automatically.
- **Generates an arc.** Build, break, ease, rebuild — no extra machinery required.
- **The Twist is free.** No separate random event roll.

---

## 8. IMPLEMENTATION (apps)

One reusable JS object, dropped into every companion:

```
ZEN.weight           // current value, 1–5
ZEN.ask(odds)        // → { roll, margin, outcome, weightAfter, broke }
ZEN.draw()           // → { motion, charge }  (already Weight-shifted)
ZEN.respite()        // Weight −1
ZEN.reset()          // after Break, Weight → 2
```

Each app skins the output in its own voice. The maths and tables are a single source
of truth. Fix it once, every companion inherits the fix.

---

## 9. OPEN TO PLAYTESTING

These values are proposed, not locked:

| decision | current value | alternatives |
|----------|--------------|--------------|
| Starting Weight | 2 | 1 (gentler open), 3 (tense from first roll) |
| Odds step | ±1 | ±2 for five-tier granularity |
| Yes-and ease | −1 | unchanged |
| Respite ease | −1 partial, −2 full | |
| Break reset | 2 | 1 (catharsis), 3 (tense aftermath) |
| Table size | d12 × d12 (144 combos) | larger pools for long campaigns |

---

*ZEN is wholly original. The rules text, the tables, and the Weight mechanic are the
sole creative work of Kyle Kogh. The system may be used freely in personal projects.
Any commercial use or redistribution requires the designer's permission.*
