# FONT — Mechanics Reference (ZEN Edition)

*How the game WORKS. The companion doc to FONT_lore.md (which holds the WORLD,
identity, brand, founding myth). Zero overlap by design: mechanics here, world there.*

*This is the ZEN Edition — the fork that replaces the Loner/Mythic spine with the
original ZEN System (v0.1, Kyle Kogh). The Loner edition (FONT_mechanics.md) remains
the stable reference. These two builds run in parallel until ZEN proves itself in
play. Where the two docs differ is the engine section only — all world design, combat
structure, time structure, character creation, and faction content are identical.*

---

## ⇨ HANDOFF NOTE (fresh instance, read first)

Continuing a long collaborative design+build with **Kyle (KGH)** on his original solo
TTRPG **FONT**. Ground-truth docs:
- **FONT_lore.md** — the world, cosmology, identity system, founding myth, brand.
  Read it for *what things are*.
- **THIS doc (FONT_mechanics_zen.md)** — the ZEN engine, combat, time structure,
  character-creation flow, the four filters. Read it for *how things work*.
- **FONT_mechanics.md** — the stable Loner edition. Reference this when you need to
  compare what changed between the two builds.
- **font-fork.html** — the ZEN build (ground truth of what EXISTS). Read it after
  the docs.

**Working relationship (match this):** Kyle throws ideas; your job is to *filter* —
champion what makes a session more fun, gently kill what makes the design merely more
impressive, say so straight when something's bloat. He values honest pushback over
agreement. He is the vision-holder; you give shape and guard against scope-creep and
drift. Don't be sycophantic. Don't re-suggest killed things. When he makes a call,
lock it and move on. **He is acutely drift-aware** — verify against current files,
never rebuild from memory, run inverse audits (check old content is GONE, not just
that new content is present).

**Build method:** single self-contained HTML file, inline CSS+JS, no external deps
except Google Fonts. Work on `/home/claude/font-fork.html`, `cp` to
`/mnt/user-data/outputs/`, then present_files. Read SKILL.md (frontend-design) before
building. Validate JS with `node --check` on the extracted script block.

---

## THE FOUR FILTERS (every decision passes through these)

1. **Tone filter:** **Gurren Lagann in the bloodstream** (defiant/kinetic — the
   DEFAULT, re-weighted), **Bebop/Champloo as texture** (melancholy-cool in the quiet
   moments between fights), **Berserk as the floor** (real, permanent cost). Design
   test for any feature: does it serve kinetic-defiance (default), real cost (floor),
   or earned glory (ceiling)? If not, probably noise.

2. **Design filter (one sentence):** *live in the city, sustained by the people you
   love; descend into the deep to become more; pay for it in what matters.*

3. **Interaction filter:** automate the busywork that's only pleasurable on paper. On
   paper, flicking pages and jotting notes IS the fun; on screen those same manual
   actions become cognitive load. Reserve clicks for choices that MATTER; automate
   state-management. → one button carries the whole Shift.

4. **Aphantasia law (Kyle is 2/5 vividness):** the non-visual sensory layer is the
   HOUSE STYLE of all GENERATED text — not a tab/feature. Every beat/scene/result/
   spirit-impression leads with one or two PRECISE physical anchors (sound, texture,
   temperature, weight, pressure, smell); sight secondary or absent. Never a list of
   senses. Never purple density. One or two telling details, then out of the way. A
   "deepen the sense" option lives INLINE on the beat. The bonded spirit communicates
   in felt sensation as much as speech.
   **Exception:** content the PLAYER invents for their own character is freeform —
   visual is fine. The law governs the game's generated output, not the player's
   authored details.
   **ZEN note:** the Aphantasia Law is now structural in the oracle itself — the
   motion×charge tables are written in the body by default. There is no separate
   SENSE tab or register to operate; the oracle simply lands where you can feel it.

---

## INTERACTION PHILOSOPHY

The app is **scaffolding that sustains writing, not a replacement for it.** Kyle has
aphantasia (2/5) and likes to write. The drain isn't writing — it's UNSTRUCTURED
open-endedness. So: automate all bookkeeping (every click saved = writing energy
preserved), keep the play area an uncluttered GENERATION SURFACE that hands him
sparks/beats/constraints to respond to, and make the writing-invitation moments (esp.
the Reckoning) AIMED rather than blank. Gamification = the structure that turns
"conjure a world" into "respond to what was dealt."

---

## THE ENGINE — ZEN System v0.1

*The ZEN System is wholly original — no borrowed mechanics, rules text, or tables.
Designer: Kyle Kogh. See ZEN_system_v0.1.md for the full standalone specification.*

### Core principle

One die. Pressure that builds and breaks on its own. An oracle that arrives already
in the body. A retreat from mechanical crunch that lets you feel a story, not solve
one.

### The oracle roll

1. State a yes/no question. Set the **odds**: Likely / Even / Unlikely.
2. Roll **1d6**. Apply the odds step: Likely **+1**, Even **+0**, Unlikely **−1**.
3. Find the **margin**: `adjusted roll − Weight`.
4. Read the outcome:

| margin | outcome | effect |
|-------:|---------|--------|
| +3 or more | **Yes, and** | overdelivers — Weight eases −1 |
| +2 | **Yes** | clean hit |
| +1 | **Yes, but** | hits, with a string attached |
| 0 | **Twist** | on the line — oracle fires — Weight +1 |
| −1 | **No, but** | fails, something small holds — Weight +1 |
| −2 | **No** | fails — Weight +1 |
| −3 or less | **No, and** | fails and worsens — Weight +1 |

### Weight of Sora

**Weight** (1–5) tracks how hard the city is pressing on you right now. It starts
at **2** — the city is already leaning.

- Rises with every No or Twist.
- Falls on a Yes-and, at Morning, and at Respite.
- Hitting 6 triggers a **Break** — the scene cracks open, something permanent turns,
  Weight resets to 2.

Weight is not a stat to manage. It is the pulse of the story.

### Odds and the bond

| bond state | odds |
|-----------|------|
| Steady | Likely (+1) |
| Flat / neutral | Even (0) |
| Frayed | Unlikely (−1) |
| Hostile | Unlikely (−1) |

The bond state sets the odds automatically in the app. Combat uses the same rule.

### The Meaning Oracle — motion × charge

When a result carries a shade, when a Twist fires, or any time you want a prompt,
roll **1d12 twice** — once on MOTION, once on CHARGE. Both tables run light → heavy.
Weight silently biases the draw: low Weight leans warm, high Weight leans grim.

**MOTION** — what the moment does:
eases · opens · draws near · settles · holds · turns · tightens · snags · frays ·
presses · gives way · breaks

**CHARGE** — the texture of it:
warmth · sweetness · lightness · hush · hum · a held breath · friction · salt · ache ·
weight · pressure · cold

You bring the subject. The oracle brings the felt shape of what happens to it.
Nothing to picture. No translation step.

### The Twist

Fires on margin 0 — emergent from resolution, not a separate counter or probability
check. One fewer thing to track.

### The Break

When Weight would hit 6: the scene breaks open, something permanent changes, Weight
resets to 2. The rhythm is: **build → break → ease → rebuild.**

### ZEN replacing Loner — what changed, what didn't

| was (Loner edition) | now (ZEN edition) |
|---------------------|-------------------|
| Chance die vs Risk die | 1d6 vs Weight (margin) |
| Advantage / Disadvantage (extra dice) | Likely / Even / Unlikely (odds step ±1) |
| Twist Counter (ticks at 2, fires randomly) | Twist emergent at margin 0 |
| Discover Meaning — Mythic word pairs | motion × charge — felt texture |
| No arc structure in oracle | Weight build/break generates arc on its own |

Everything else — combat, time structure, character creation, factions, the Reckoning,
the Ledger — is unchanged. ZEN sits underneath; the game on top is identical.

---

## COMBAT — Harm & Luck (unified ZEN oracle-driven)

The oracle drives combat. Frame an action, roll, read the margin:

| outcome | enemy Luck | your Luck |
|---------|-----------|-----------|
| Yes, and | −3 | — (Weight eases) |
| Yes | −2 | — |
| Yes, but | −1 | −1 |
| Twist | −1 | −1 (fireTwist fires) |
| No, but | — | — (VULNERABLE flag set) |
| No | — | −1 (−2 if Vulnerable) |
| No, and | — | −2 (−3 if Vulnerable) |

**VULNERABLE flag:** set on No-but. The next No costs more; the next Yes gains Likely
odds. Clears after the following roll regardless.

- **Manifestation defeat:** enemy Luck hits 0 → "Defeat [Name]" button waits for
  player narration before concluding. Does not auto-resolve.
- **Three flee modes:** avoid pre-fight (pressure +2); flee mid-fight (pressure +2,
  −1 Luck); flee dungeon from a loss (tiredness, −1 extra).
- **Boss defeat oracle:** `d6 >= Weight` — spirit holds or falls based on how hard
  the world is already pressing. Higher Weight = harder to escape the outcome.
- **Max-pressure boss** reads `spiritFighting` flag: fighting → surges; non-fighting
  → sacrifice/protect. Outcome tree: victory → reward; defeat → spirit surges/
  sacrifices/shatters → escape, or Death/Broken & Changed (per permadeath toggle).
- **Depth-reward ladder:** Fable Spirit (shallow) → Spark/bond (mid) → Legendary
  (A-rank) → Myth (S-rank).

---

## TIME STRUCTURE

- **A Beat / Moment** — one scene, powered or ordinary.
- **A Shift** — one day. **Morning** (civilian beat; Luck + bond restore; Weight
  eases) → **Night** (powered: city or dungeon) → **The Reckoning** (the Bleed
  question). One Next Beat button walks the whole cycle.
- **An Arc** — 5–7 Shifts. One storyline. Five-beat episode shape as a pacing guide
  (Opening, Enticing Incident, Complication/Crisis, Climax, Resolution) — not an
  enforced rule.
- **A Season** — 4–6 Arcs. Faction standing shifts permanently, bonds scar or deepen.

**ZEN note — Weight and the Shift cycle:**
Morning eases Weight by 1 (the day is the exhale). Partial Respite in the dungeon
eases by 1. Full Respite eases by 2 (costs pressure +2). The Reckoning Bleed
probability is `Weight/7` — the more strained things are, the more the two lives
collide. Weight is woven into the rhythm, not just the oracle.

### THE RECKONING (the Bleed as reflection tool)

Three-part end-of-Shift sequence:
1. **The Recap** — pulls the Shift's actual beats from the log. Condensed lines.
2. **The Question** — *do these threads touch?* Three options: "These touch" (player
   yes) / "They don't" (player no) / "Let the oracle decide" (probability Weight/7 —
   higher under strain).
3. **On YES** — draw a **Read** (motion × charge, Weight-tinted) as a spark. Text
   field: "How does this morning's thread reach into tonight's?" Kyle WRITES it.
   Option to make it a Thread → persistent Tag. Writing always optional.
   **On NO** — threads held apart; bond steadies; Shift closes.

*ZEN note: the Reckoning spark is now a motion × charge draw, not a Mythic word pair.
The same Weight-tinted bias applies — a Reckoning at high Weight draws from the grim
end of both tables.*

---

## CHARACTER CREATION (7-step)

Flow: **Personality → Awakening → Spirit → Class → Prompt A → Prompt B → Name.**
*(The old archetype/cape persona flow is retired. See FONT_lore.md "Identity Reframe.")*

1. **Personality** — 18 options across General/Rare/Hero tiers. Each carries
   `fighting:true/false`. Drives spirit-affinity and the boss outcome tree.
2. **Awakening** — how the power broke open (10 options). Kinetic super-origins.
3. **Spirit** — name + domain + optional voice. Shows prior choices + combination-
   suggestion built from personality × awakening.
4. **Class** — relationship to power: The Bonded / The Forged / The Augmented /
   The Manifold / The Hollow / The Delver.
5. **Prompt A** — "Who are you in the world above?" The daylight self.
6. **Prompt B** — "Who does the deep make you?" Carries moral colour implicitly.
   Optional Face toggle (OFF default).
7. **Name & Begin** — name, home district, what you'd protect, permadeath toggle.

**A + B collision = the character AND the Bleed.** Both defined values the Reckoning
reads to name the specific collision.

---

## KEY IMPLEMENTATION DETAILS

- **Starting character:** Spark 3 · Luck = Spark+3 (6) · bond depth II · bond mood
  "steady" · **Weight starts at 2**.
- **Save key:** `font_v3_weight` in localStorage (distinct from the Loner build's
  `font_v2` — the two builds do not share saves).
- **`spiritFighting` flag:** derived from Personality (`fighting:true/false`). Drives
  spirit voice pool and boss outcome tree. Unchanged from Loner edition.
- **Bond mood → odds:** steady = Likely (+1); frayed = Unlikely (−1); hostile =
  Unlikely (−1). Combat uses the same rule. No Advantage dice — odds step only.
- **Districts:** ring model (inverted wealth). See FONT_lore.md for names.
- **Dungeon:** entrance = Mugen. Descend consumes half-day. 8 beat kinds incl.
  Respite (Luck restored; Weight eases). Manifestations auto-fill enemy tracker.
  Probabilistic pressure clock; floor crossings halve pressure. Luck does not restore
  in the deep.
- **Themes:** Dusk (warm default) · Daybreak (bright) · Midnight & Gold (brand
  palette — requires `body.midnight` component overrides).

---

## TWO NUMBERS, TWO JOBS (DO NOT MERGE)

- **SPARK** = power level. Climbs. Gates Tags. Feeds Luck pool size.
- **LUCK** = the per-fight pool you watch drain. Restores at Morning.

Weight is a third value but a different kind — it is the world's state, not the
character's. It does not gate anything and it does not persist between sessions as
a progression marker. It breathes.

---

## RANK (D→S) — separate axis, do not merge with Spark

- **Spark** is private interior power; **Rank** is public certified delving depth.
  They can mismatch — that gap is story.
- **Rank earned by faction progression, not floor-grinding.** Every 2 standing = one
  band. D(2) → C(4) → B(6) → A(8) → S(10). No E — D is the floor.
- **Band universal, title per-faction.** Cult: Penitent→Limit-Seeker→Deepwalker→
  Abyssal→Bottom-Seeker. Veneration: Echo→Reflection→Mirror→Vessel→Avatar.
  Guild: [TBD].
- **Multi-track (Ryuugenism):** rank = the HIGHER conviction track. Hedging doesn't
  count; depth in one path certifies you.

---

## SOURCES — what's in, what's out

- **ZEN System v0.1** → the entire oracle spine. Original, wholly owned.
- **City of Crime** → district/encounter shape for Sora. Patrol machinery dropped.
- **Book of Random Tables: Superheroes** → generators repurposed (origins → Awakening).
- **Beyond Super: Life Behind the Mask** → civilian beats, cost-ledger → the Ledger.
  Card minigame dropped.
- **SoLAR** → five-beat arc shape as pacing guide only. Deck/pool mechanics cut.
- **Dungeon Break** → progression/dungeon/personality-tier framework. d20 crunch cut.
- **Loner** → CUT entirely. No borrowed mechanics remain.
- **One-Page Mythic** → CUT entirely. motion × charge replaces Discover Meaning.
- **Outsiders** → shelved as a future expansion.

---

## PROTOTYPE STATUS (font-fork.html — ZEN build)

**Built & working:** Everything from the Loner build (font-v3.html) plus ZEN engine
integration: Weight display (five pips, colour-coded jade/ochre/hostile), odds
selector (Likely/Even/Unlikely), margin-based oracle roll with Weight badge display,
motion×charge Read draw (Weight-tinted, silent bias), Twist emergent at margin 0,
Break fires at Weight 6 (resets to 2), easeWeight on Yes-and / Morning / Respite,
tickWeight on No and Twist, boss spirit-hold probability Weight-dependent, Reckoning
Bleed probability Weight/7, state migration guard for old saves.

**Not yet built (same threads as Loner edition):** class-specific creation layer;
Pillar 3 deep mechanics; Pillar 4 five factions + standing; music; full How-to-Play;
AI panel calibration; full city; bond-break scar tables; full personality table.

**ZEN-specific future work:** the engine JS object extracted into a single reusable
module (ZEN.ask / ZEN.draw / ZEN.respite / ZEN.reset) so all companions share one
source of truth. Currently embedded directly in font-fork.html.

---

## NAMED RIVAL — faction champion encounter

*(Identical to Loner edition. Reproduced in full for standalone reference.)*

A two-phase boss encounter tied to faction conflict. The name and epithet of the
Rival is left blank; the player fills it at first encounter. The role is canon. The
person is theirs.

**Trigger — both required:**
1. Faction favour reaches 6 (B-rank) in any faction other than your primary
2. That faction's second major event quest completed

**Phase 1:** Standard ZEN combat oracle. Rival starts at 6 Luck.

**Phase 2:** Rival hits 0 Luck but does not fall. They gain a player-named phase tag.
Luck resets to 4. When they hit 0 again the encounter resolves. Player interprets
the outcome — death is not the default.

**Favour consequences:** −2 with Rival's faction · +2 with your primary faction.

---

## FACTION ACTIVITY SYSTEM

Three layers, same delivery as the Loner edition:

**Encounters (d10, rolled from the map)** — zone finds you.
**Missions (d10, rolled from the faction tab)** — board assigns, one decline per shift.
**Milestones (fixed at standing 2 / 5 / 10)** — arrive automatically.

All three use the ZEN oracle for any resolution prompt.

---

### RYUUGENISM — House of Sora

*(Full encounter, mission, and milestone tables are identical to the Loner edition.
Reproduced here in full for standalone reference.)*

**Encounter table (d10) — shared, both sects**

| # | The Situation | The Sensation |
|---|---|---|
| 1 | A Cultist and a Venerator are arguing in the scripture library over a text neither can fully read. Both turn to you. | The particular discomfort of being the tiebreaker in someone else's faith. |
| 2 | An outer-ring binder has come to register a spirit experience. Neither sect wants to process them — the description doesn't fit either doctrine. | Something genuine the institution doesn't have a form for. |
| 3 | A fragment surfaces in the vault — hauled up from the deep, misread as holy. The scholars are excited. Something about it feels wrong in the chest. | The specific unease of a room full of people being confidently incorrect. |
| 4 | Someone you know from the city's daylight life is here, deep in conversation with a senior devotee. They haven't seen you. | The friction of two lives occupying the same room without touching. |
| 5 | A junior devotee is failing their first descent — in the courtyard, shaking, unwilling to admit it. The faith expects them to go back down. | The weight of a standard pressing on someone who isn't ready. |
| 6 | The Cult side is performing a rite. The Veneration side is performing a different one simultaneously. The acoustics of the shared stone carry both. | Two certainties running through the same walls. |
| 7 | An unregistered binder has come seeking sanctuary. The Guild filed a report this morning. The faith hasn't decided yet. | Decades of institutional friction compressed into one person standing in a doorway. |
| 8 | A high-ranking devotee asks you a precise question about your spirit. They're not making conversation. | The feeling of being read by someone who knows what they're looking for. |
| 9 | A relic in the shared vault is responding to something — a warmth, a low hum, nothing explainable. The scholars are filing it as atmospheric. It isn't. | The hum of something old recognising something in you it hasn't felt in a long time. |
| 10 | The House is quiet in a way it shouldn't be. Something came up from the deep last night and the faith is deciding what it means before it tells anyone. | The specific silence of an institution choosing its story. |

**Cult missions (d10)**

| # | The Contract | The Sensation |
|---|---|---|
| 1 | Temper the blood — survive a descent into the Uncharted without calling on your spirit. | The pulling pressure of the deep, behind your sternum. |
| 2 | Touch the floor — reach the deepest charted rank you're licensed for and come back changed. | Stone breathing back the heat you spent climbing down. |
| 3 | Silence the Feral — hunt a practitioner whose bond broke and who went mad in the dark. | A hollow frightened silence that doesn't heal. |
| 4 | Temper a Novice — drag a new Spark through their first descent, crack them open wide enough. | The moment something gives, and they're never small again. |
| 5 | The Limit Test — duel a rival to prove your Spark runs deepest of the two. | Your blood running hotter than a person's should. |
| 6 | Feed the Mouth — escort an offering to a place in the deep the Cult holds sacred. | The warm wrong comfort of a thing that eats and provides. |
| 7 | Break the Soft — confront a Cultist losing faith before their doubt becomes a Futility Break. | The cold draught of a back about to go bare. |
| 8 | Read the Strata — descend to where the pressure peaks and simply endure it, listening. | Grinding stone, and under it, something like a pulse. |
| 9 | Hold the Line — defend a delve-camp at Mugen's edge from what climbs up at night. | The good ache of a stance you refuse to give up. |
| 10 | Prove the Infinite — go deeper than your rank permits and return alive, on faith alone. | The roar in the chest that says *down is the only answer.* |

**Veneration missions (d10)**

| # | The Contract | The Sensation |
|---|---|---|
| 1 | Haul up a "holy relic" — a fragment inscribed in a builder's script no one living reads. | The cold weight of a forgotten purpose. |
| 2 | Record the Trace — find a fable-spirit and name the Saint's virtue it distorts. | A voice like a teacher who never has to raise it. |
| 3 | Sync the Notation — carry the Web's coded tablets across the city without breaking the sequence. | The exactness of a held breath before the word. |
| 4 | The Saint's Path — perform a rite at one of the old moss-grown circles. | A warm, low, gold-feeling quiet that says *home*. |
| 5 | Relic Scavenge — sanctify, or expose as false, a piece of relic-tech sold as junk. | The faint hum of a tool that remembers being a wonder. |
| 6 | Invoke the Swift — reach a goal through defined intent alone, no wasted motion. | The certainty that the one direction you can't watch is covered. |
| 7 | Hold the Blade — stand an unmoving guard over a relic or a Venerator through a night of pressure. | The discipline of a line that simply does not break. |
| 8 | Name the False — debunk a rival's claimed relic, or authenticate your own, before the scholars. | The clean click of a pattern resolving into truth. |
| 9 | Re-name a Fragment — carry a relic into the deep to re-name its intent. Does it answer, or must you force it? | The stillness right before a word that changes a thing. |
| 10 | Mirror a Saint — face a trial that demands one Saint's virtue exactly, and embody it. | The weight of a founder's impression settling over your own. |

**Ryuugenism milestones**

*Standing 2 — The Inherited Trace:*
Someone of the faith feels the vitality of your Spark and stops you to test it.
Use the ZEN oracle for how they test you.
— Lean Cult: a Limit-Seeker drags you to Mugen's edge. Prove your faith by going
down, not by speaking. Define what the descent takes out of you.
— Lean Veneration: an Echo presses you to name the virtue you carry. Define which
Saint's impression your Spark already echoes, and how your spirit's voice shifts.

*Standing 5 — The Heavy Record:*
A fragment of the first Sora is hauled up — cold, heavy, misread by scholars as holy.
The burden is placed in your hands. Use the ZEN oracle for the weight of it.
— Lean Cult: carry it down. Temper it against the deep's pressure until it proves
itself or shatters. Does the strata answer through it?
— Lean Veneration: carry it to be re-named. Speak its true intent, or force your
Spark to overwrite the scholars' misreading. Does it answer, or must you make it obey?

*Standing 10 — The Fundamental Shift (the ending):*
A · Total Tempering (Cult dominates) — you lead a descent to the absolute breaking
point and come back having proved the Infinite. Define how the Cult's dominance makes
the city harder, colder, more vital.
B · Restoration of Law (Veneration dominates) — you embody a Saint so completely the
city follows. Define how Sora changes when every citizen treats their Spark as a
disciplined tool of the founders.
C · The Architect's Refusal (either lean) — faced with disaster you trigger a Refusal
Catch, becoming for a moment an Avatar. Define how you reshape a whole sector to save
or destroy it.
*Named Rival threshold — if conditions are met, the champion finds you here or after.*

---

### THE GUILD — Guild Hall

**Encounter table (d10)**

| # | The Situation | The Sensation |
|---|---|---|
| 1 | A clerk flags your file — something in your recent activity doesn't match your registered rank. They're polite. They're not letting you leave yet. | The particular weight of being correctly evaluated by someone who doesn't care about you. |
| 2 | Two binders ahead of you in the contract queue are arguing over the same job. Both ranked higher than you. Both looking at you to break the tie. | The pressure of a decision that isn't yours becoming yours anyway. |
| 3 | An unregistered binder is working a job two streets from the Guild Hall. Someone filed a report. You're the one who found them first. | The friction of a rule you understand pressing against a person you're looking at. |
| 4 | A contract closes that you didn't take — the binder who did is being carried back past the board. They were one rank below the job's requirement. | The specific silence of a board that keeps posting anyway. |
| 5 | Someone from the Celestial Assembly is walking the floor unannounced. The clerks straighten. Everyone is filing things very carefully. | The change in a room when authority enters it and doesn't announce itself. |
| 6 | A contract goes up mid-shift — the job is in your district, the pay is unusual, the description is vague in a deliberate way. | The itch of something being left out of the briefing on purpose. |
| 7 | A faith-binder is at the desk refusing to register. The clerk is reciting procedure. Neither of them is going to move. You're next in line. | Decades of friction compressed into two people and a form. |
| 8 | Your rank gets challenged — a binder you've crossed before has filed a formal dispute. It doesn't mean anything yet. | The slow grind of a system being used exactly as designed against you. |
| 9 | The board has a contract with your name on it. Not assigned to you — *about* you. | The cold specific feeling of being someone else's filed report. |
| 10 | A retired S-rank is in the Hall — not Assembly, just visiting. They're looking at you with mild interest. | The weight of being noticed by someone who has seen everything and is still curious. |

**Guild missions (d10)**

| # | The Contract | The Sensation |
|---|---|---|
| 1 | Locate and assess an unregistered binder in the inner ring. File a report. What you do with them after is your business. | The gap between what the contract asks and what it implies. |
| 2 | Escort a shipment of ranked relics from the deep to the Guild archive. The relics are not standard. | The weight of something old that doesn't want to be filed. |
| 3 | A posted bounty — a binder who jumped their rank and went into the Uncharted. They came back. The Guild wants to know what they found. | The pull of a question you're being paid not to answer for yourself. |
| 4 | Debt collection — a contractor took the advance and hasn't been seen since. Find them. | The specific exhaustion of cleaning up someone else's choice. |
| 5 | A rival's contract is running in your territory without Guild sanction. Shut it down — quietly, on the record. | The friction of doing the right thing in exactly the way someone powerful will resent. |
| 6 | Witness a certification exam where the examiner has filed a conflict of interest. You're the neutral party. | The pressure of a verdict landing in your hands because everyone else had reasons. |
| 7 | A contract the Guild can't officially post — the client is a faction it can't be seen working with. | The particular taste of institutional plausible deniability. |
| 8 | Clear a site — something in the industrial ring has made it unworkable. The report says "interference." | The sound of a briefing that ends before it's finished. |
| 9 | A binder is descending past their rank on purpose, repeatedly — not reckless, deliberate. Find out why. | The feeling of chasing someone who knows exactly what they're doing and hasn't decided to stop. |
| 10 | Open contract — the board posts it blank. You write the job, file it, run it, report it. | The freedom of a form with no instructions. |

**Guild milestones**

*Standing 2 — The File Opens:*
The Guild formally registers your activity. A clerk reads your file twice and stamps
it. You are now a known quantity. Someone from middle management introduces themselves
— professionally. They use your rank first. They use your name second.
ZEN oracle prompt: do they find something in the file they weren't expecting?

*Standing 5 — The Evaluation:*
A senior binder (A-rank, not Assembly) pulls you for an informal assessment. Not a
test — a conversation. They want to know if you understand what the Guild *is*, not
what it does.
ZEN oracle prompt: do you give them the answer they respect, or the one that's true?

*Standing 10 — The Assembly Sees You:*
A member of the Celestial Assembly summons you. Not a threat, not a reward. They want
to know what you're going to do next.
*Named Rival threshold — if conditions are met, the champion finds you here or after.*

---

*[System discipline note: the ZEN oracle and the Loner oracle are not interchangeable
mid-campaign. A save started in the Loner build (font-v3.html, key: font_v2) will not
load into the ZEN build (font-fork.html, key: font_v3_weight) — they are separate
instances. Play both, compare the feel, and when ZEN proves itself the Loner edition
can be retired. Until then both docs and both builds are live.]*
