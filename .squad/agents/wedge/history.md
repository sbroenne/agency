# Wedge — History

## Core Context

- **Project:** A GitHub-based squad agency site that publishes a registry of squad manifests and is being aligned to the Bradygaster Squad docs stack while preserving Awesome Copilot-inspired discovery UX.
- **Role:** UX Tester
- **Joined:** 2026-03-17T05:21:16.969Z
- **Requested by:** Stefan Broenner
- **Current stack:** Astro 5.7, Tailwind 4.1, Playwright for browser-based UX verification

## Learnings

<!-- Append learnings below -->
- 2026-03-18: Full UX re-review completed via source + dist inspection (browser launch still blocked by missing libnspr4/libnss3). All 6 visual acceptance criteria pass on class-name audit: white shell, rose primary CTAs, no backdrop-blur, no cyan, tight radius (rounded-md=6px, rounded-lg=8px, rounded-xl=12px on modal only), no explanatory meta-sentence. Registry tests pass 2/2.
- 2026-03-18: Interaction quality is solid — keyboard-accessible cards (tabindex=0, Enter/Space opens modal), proper modal ARIA (role=dialog, aria-modal, aria-labelledby, Escape closes, focus returns to source card), skip link, aria-live results summary. These are production-ready patterns.
- 2026-03-18: Primary UX gaps vs the agreed decisions.md IA: (1) Filter UI not built — only search exists, no Status chips or Focus collapsible. (2) Only 1 squad in registry — grid and filter UX untestable at real scale. (3) Missing OG/social meta (no og: tags) and no favicon in BaseLayout. (4) Card dual-action pattern (click = modal, "View →" = external) has no visual affordance to distinguish the two intents — may confuse first-time visitors.
- 2026-03-18: Source-only review is a reliable fallback for palette/radius/blur/text content checks on Tailwind+Astro sites. Not reliable for computed hover states, focus ring colors, or JS-driven DOM mutations like modal rendering. Those still require a live browser.
- 2026-03-17: Reviewed the Astro landing page against the live Bradygaster Squad site and docs using local preview + Playwright capture. The current `src/styles/global.css` palette is rose/cyan/navy on dark glass surfaces, but the live Squad docs language is much lighter and more restrained: white/light-neutral page chrome, rose-primary CTAs (`#dd2d60`), pale rose active states (`#fff0f3`), and simpler bordered surfaces.
- 2026-03-17: Key files for visual review are `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/scripts/site.js`, and `src/styles/global.css`. These files currently drive the palette, CTA treatment, card surfaces, and modal styling that need to be brought back toward the live Squad docs reference.
- 2026-03-17: Local verification path works with `npm run build`, `npm test`, and `npm run preview -- --host 127.0.0.1`. Use preview, not just source review, before accepting any future visual pass.
- 2026-03-17: Visual acceptance harness prepared at `tests/visual-acceptance.test.mjs`. Run with `npm run test:visual` (builds the site first). The test starts its own preview server on port 4322, captures screenshots to `tests/screenshots/visual-acceptance/`, and asserts the six acceptance criteria: lighter shell, rose CTA pair, no backdrop-blur, no cyan accent, tight border-radius (≤20 px), and no explanatory style sentence. The `test` script was narrowed to `tests/registry.test.mjs` so the visual harness (which needs a browser) does not run in CI automatically.
- 2026-03-17: Playwright is installed as `playwright` (not `@playwright/test`). Access the chromium API via `createRequire` in an ESM file: `const { chromium } = require('playwright')`. The test runner used is Node's built-in `node:test`.
- 2026-03-17: Playwright browser launch on this host requires `libnspr4` + `libnss3` (aarch64) which are not installed. When browser launch fails, fall back to source + dist inspection for static Tailwind/Astro sites — compiled Tailwind class names are direct proxies for computed style values, so CSS token inspection + class audit gives equivalent signal to a browser review for palette, radius, backdrop, and text checks.

---

## Full Project Review Submission — 2026-03-19

**Event:** Full UX review findings submitted; merged into decisions.md  
**Date:** 2026-03-19T05:49:18Z

Visual acceptance audit completed. Key findings:
- **Visual language:** ✅ ACCEPTED (6/6 criteria passed)
- **Filter UI:** ❌ UNIMPLEMENTED (Tier 1 status chips, Tier 2 focus collapsible missing)
- **Playwright infrastructure:** ❌ BROKEN (libnspr4/libnss3 missing on host)
- **Card dual-action affordance:** Issue documented; needs tooltip/indicator

All findings documented in `.squad/decisions.md` section "Full Project Review — 2026-03-19".

**Related:** Review consolidated in orchestration log and session log files.
- 2026-03-19 (re-review): All primary blockers from last review are resolved. Filter UI (Tier 1 + Tier 2) is now fully implemented and passes all 15 structural tests (filter-ui.test.mjs). Registry tests 10/10. Visual acceptance 6/6 via source+dist audit (browser still unavailable — libnspr4/libnss3 still not installed). Verdict: **APPROVED** for launch.
- 2026-03-19 (re-review): Remaining non-blocking gaps: (1) OG/social meta tags absent from BaseLayout — post-launch polish item. (2) Favicon absent. (3) Card dual-action affordance (click=modal, "View →"=external) has no tooltip/indicator — cosmetic, not blocking at 1-squad scale. (4) Only 1 squad in registry — data issue, not code.
- 2026-03-19 (re-review): filter-ui.test.mjs is a reliable, fast structural proxy for Playwright when browser launch is blocked. It tests against compiled dist output, catching minification/class-stripping regressions that source-only review misses.

## Learnings

- 2026-07-14 (copy review): Padme landed brand/copy changes. "agency" replaces "Awesome Squads" in badge and title. H1 changed from "Community-contributed squads for GitHub Copilot" → "AI teams that work inside your codebase". Subhead and meta description also updated with specific action verbs. Changes approved.
- 2026-07-14: Copy review pattern — check BaseLayout defaults even when index.astro overrides them. Stale fallback strings are a maintenance hazard for future pages that don't override title/description.
- 2026-07-14: Good headline test: does it answer "what do I get?" (value) rather than "what is this?" (description)? "AI teams that work inside your codebase" passes; "Community-contributed squads for GitHub Copilot" fails.

## Headline Approval — 2026-03-19

**Task:** Review Mon Mothma's revised hero headline per prior rejection of Padme's version

**Copy reviewed:**
- **H1:** "Find your next squad"
- **Supporting copy:** "Browse AI teams you can inspect, copy, and run in your own projects."
- **BaseLayout default meta:** "Find your next squad. Browse AI teams you can inspect, copy, and run."

**Against prior rejection criteria:**

1. ✅ **Lead with discovery language**
   - "Find" opens the H1; "Browse" opens the subhead
   - Both are active discovery verbs
   - Copy principle satisfied: no installation language

2. ✅ **Stay under about 6 words**
   - H1 is 4 words
   - Tight, scannable, nothing wasted

3. ✅ **Only promise what the page actually delivers**
   - Users land and literally browse squads
   - Inspect squad files ✅, copy them ✅, run them ✅
   - Every verb in subhead maps to real action

**Additional notes:**
- BaseLayout default description now in sync with hero framing
- Future pages that don't override will inherit consistent discovery-first copy (improvement over stale fallback)
- Page-level description override in `index.astro` also acceptable — leads with discovery, no false promises

**Verdict:** ✅ APPROVED  
**Action:** Cleared for publish — no residual issues

## Docs Copy Audit Review & Stale Language Detection — 2026-07-14

**Task:** UX review of Lando's docs audit findings

**Context:** Lando audited repo-facing docs; left no inbox entry. Stefan requested follow-up verification.

**Wedge Review Findings:**

**PASS items (3/5 files):**
- ✅ README.md — consistent branding, no stale "Awesome Squads" language
- ✅ src/layouts/BaseLayout.astro — correct meta description aligned with approved copy
- ✅ src/pages/index.astro — H1 "Find your next squad", subhead accurate, badge correct

**FAIL items (stale visual language):**
- ❌ CONTRIBUTING.md line 40 — described stale palette: "neutral dark surfaces, navy depth, restrained cyan highlights" (rejected pre-redesign palette)
- ❌ .github/PULL_REQUEST_TEMPLATE.md — visual checkbox described same stale palette

**Impact:** Contributors would optimize for wrong visual target.

**Verdict:** PARTIAL REJECT — Lando's implicit no-change conclusion rejected. Real stale copy contradicts approved visual system.

**Required Changes:**
1. CONTRIBUTING.md line 40: replace with "white/light-neutral shell, rose-led primary accents, calm bordered surfaces, and tighter radii"
2. PULL_REQUEST_TEMPLATE.md: same replacement

**Revision Author Requirement:** Lando must not author revision (per team protocol). Route to Padme or Mon Mothma.

---

**Follow-up: Approval of Padme's Revision — 2026-07-14**

**Task:** Review Padme's corrections to stale visual language

**Changes Verified:**
- ✅ CONTRIBUTING.md: Dark palette language removed; approved visual tokens (white/light-neutral, rose, bordered, tighter radii) in place
- ✅ PULL_REQUEST_TEMPLATE.md: Same corrections; stale language fully purged
- ✅ Tests pass (npm run build, npm test 10/10)

**Verdict:** ✅ APPROVED — Cleared to merge

**Outcome:** Contributors now guided toward correct visual target. All stale palette references eliminated from repo-facing docs.
