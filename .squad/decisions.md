# Squad Decisions

## Active Decisions

### Landing Page Information Architecture

**Owner:** Mon Mothma (Lead) + Poe (UX Engineer)  
**Date:** 2026-03-16  
**Status:** Implemented

#### Problem

Current landing page does not scale as catalog grows:
1. Content order prioritizes Quickstart (installation) over Directory (discovery)
2. Single-select filter chips hit ceiling at ~20 tags
3. Tag exposure inconsistent (3 tags on cards, all tags in detail view)

#### Recommendation: Three Moves

**1. Reorder content: Discovery first**
- Move Directory above Quickstart
- Rationale: First-time visitors browse catalog before adopting ("I want to see what exists" → "Now I'll set up")
- Pattern: Observed on awesome-copilot.github.com

**2. Smart filter UI: Search-first + Progressive disclosure**
- Top-N display (5-7 most-used focus areas visible; "Show all filters" expander for rest)
- Collapse Focus group by default, show count ("8 focus areas")
- Faceted search for power users ("focus:ai language:python")
- Sort by popularity, not alphabetically
- Principle: Search scales infinitely; filter lists do not

**3. Progressive tag disclosure: Reduce cognitive load**
- Cards: Show 1-2 tags only, add "+N more" indicator
- Detail view: Group tags into sections ("Focus areas", "Platforms", "Technologies") with visual hierarchy
- Make tag badges clickable → pre-filter Directory (single-click refinement)

#### Proposed IA

```
Hero (mission + value)
  ↓
Directory (primary destination)
  ├─ Search (primary discovery entry)
  ├─ Filters (Status visible, Focus collapsed)
  └─ Squad cards (1-2 tags + "+N more")
      ↓ (click card)
        Detail pane
          ├─ Full roster + mission
          ├─ Tags grouped by category
          └─ Tag links → pre-filter Directory
  ↓ (scroll)
Quickstart (supporting role)
  └─ Installation & adoption workflow
```

#### Impact

- **Visitors:** Simpler onboarding; browsing unblocked by installation friction
- **Catalog growth:** UX remains usable at 50+ squads; search-first design scales indefinitely
- **Team:** Reduced support questions about "how do I find a squad?"

#### Implementation Specification

**Tier 1 Filter (Always Visible):**
- Status: 3 options (All, Live, Building, Prototype) as small chips

**Tier 2 Filter (Collapsible):**
- Focus: Collapsed by default, shows count ("8 focus areas")
- Expanded: Top 5–7 most-used focus tags visible
- Inline search field within expanded state for 50+ tag scalability
- Facet counts per tag (e.g., "GitHub (12 squads)")

**Card Density:**
- Show 1–2 most-relevant tags + "+N more" link
- Detail pane: Full tag list grouped by category (Focus, Platforms, Technologies)
- Tags clickable → pre-filter Directory

**Quickstart Placement:**
- Move below Directory (below fold)
- Phase 1: Collapsible accordion; Phase 2: Test separate page if needed

**Copy Principles:**
- Lead with discovery language ("Browse", "Discover") not installation
- Progressive disclosure: hide complexity until user engages
- Hero: "Discover reusable squad templates, inspect source repos, and contribute your own"

#### Implementation Phases

**Phase 1 (MVP) — 1–2 sprints**
- [ ] Reorganize HTML: hero → directory → quickstart
- [ ] Multi-select focus filter with inline search
- [ ] Add facet counts per tag
- [ ] Update hero copy (remove installation language)
- [ ] Elevate "Submit a squad" CTA to hero
- ROI: Unblocks growth for 20+ squads; matches awesome-copilot pattern

**Phase 2 (Enhancement) — 1 sprint**
- [ ] Quickstart collapsible accordion
- [ ] Category browsing cards (if curator defines categories)
- [ ] Mobile filter drawer UX

#### Convergence Note

This decision was architecturally sound but temporally premature at creation. See **Landing Page Redesign & Platform Rebuild** for current baseline and sequencing rationale.

#### Artifacts & Decision Records

- **Orchestration log:** `.squad/orchestration-log/2026-03-16T20:45:00Z-mon-mothma.md` (rejection analysis + direction)
- **Revision sprint:** `.squad/orchestration-log/2026-03-16T20:45:30Z-r2-d2.md` (R2-D2 task initiation)
- **Session log:** `.squad/log/2026-03-16T20:45:00Z-redesign-rejection-pivot.md` (detailed context for team)
- **Implementation guidance:** `.squad/decisions/inbox/mon-mothma-redesign-direction.md` (detailed spec for changes, to be archived post-completion)

#### Related Decisions (Context)

**Landing Page Redesign & Platform Rebuild** — The IA was sound; timing was wrong. Architecture concepts (discovery-first, tier-2 collapsible filters, progressive disclosure) will be valuable when catalog justifies them.

**Bradygaster Squad Style Alignment** — Visual polish concepts (subtle animations, glowing backgrounds) deferred; focus on interaction simplification first, styling can layer back later.

**Technology Stack: Astro + Tailwind Adoption** — Deferred; current static stack sufficient for simplified MVP. Revisit after redesign ships.

---

### Public Pages Squad Browser

**Owner:** R2-D2 (Platform Engineer)  
**Date:** 2026-03-16  
**Status:** In Implementation

#### Decision

Rebuild the public landing page with:
1. **Awesome Copilot** as primary UX/IA reference
2. **Bradygaster Squad** as primary visual reference
3. Static Astro + Tailwind + squads.json data source

#### Rationale

- Awesome Copilot exemplifies search-first discovery pattern needed for scalable squad catalog
- Bradygaster Squad visual language provides production-ready design tokens and components
- Static generation + data-driven updates provide reliability and simplicity at current scale

#### Related Decisions (Context)

**Landing Page Information Architecture** — IA concepts (discovery-first, faceted search, progressive disclosure) adopted; execution simplified for MVP scope.

---

### GitHub Flow Design

**Owner:** Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Active

#### Changes

- **`.github/PULL_REQUEST_TEMPLATE.md`** — Updated with preview requirement
- **`.github/workflows/deploy-pages.yml`** — Updated to support Astro build artifact output
- **`.github/workflows/validate.yml`** — Updated to include visual acceptance checks

---

### Bradygaster Squad Style Alignment

**Owner:** Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Active

#### Decision

Adopt Bradygaster Squad visual language (palette, components, typography, motion) as the design system for all squad site experiences.

#### Rationale

- Squad docs are the canonical visual reference for squad-related experiences
- Consistency reduces cognitive load for users navigating squad-related resources
- Established design tokens reduce decision overhead for team

#### What Changes

- Color palette: Adopt squad docs palette (dark backgrounds, rose accents, neutral text)
- Components: Button styles, card patterns, modal transitions
- Typography: Heading hierarchy, line heights, letter spacing
- Motion: Restrained animations; no heavy effects

#### Implementation Notes

- Design tokens in `.squad/skills/docs-stack-alignment/`
- All UI components should reference these tokens
- New squad-adjacent features (landing page, registry) should apply this design system

---

### Tech Stack Alignment & Local Preview Mandate

**Owner:** Stefan Broenner (User)  
**Date:** 2026-03-17  
**Status:** Active

#### Decision

**DIRECTIVE.** Effective immediately:

1. **Tech Stack Alignment:** Squad site must use the same core technology stack as Bradygaster Squad docs (Astro 5.7, Tailwind CSS 4.1 via `@tailwindcss/vite`). Pages deployment from `dist/`.
2. **Local Preview Mandate:** Every major UX change must have a local preview available before publishing to production. This is now mandatory, not optional. Required: `npm run dev` for iteration, `npm run build && npm run preview` for pre-publish validation.

#### Rationale

- Documentation and product should share dependencies to reduce context switching and maintenance burden
- Local preview gates prevent regression and allow design review before deployment
- Static build artifact from Astro matches Pages deployment environment, reducing surprise failures
- User requirement — captured for team memory

#### Implementation Scope

- [x] Audit current site tech stack vs. Squad docs stack
- [x] Identify gaps and plan alignment work
- [x] Establish local preview workflow (`npm run dev`, `npm run build`, `npm run preview`)
- [x] Document preview process in CONTRIBUTING.md
- [x] Integrate preview validation into PR review checklist for major UX changes

#### Success Criteria

- [x] Tech stack components match (Astro 5.7, Tailwind 4.1 with `@tailwindcss/vite`)
- [x] Local preview workflow documented and working
- [x] Team enforces preview requirement for all major UX changes before publication
- [x] GitHub Pages workflow builds and deploys Astro static output from `dist/`

---

### Model Override: GPT-5.4 for Landing Page Rebuild

**Owner:** Stefan Broenner (User)  
**Date:** 2026-03-16  
**Status:** Active  
**Scope:** R2-D2 rebuild pass

#### Decision

Override default model (auto) to **GPT-5.4** for the landing page rebuild task.

#### Rationale

- Improved reasoning and code quality on complex rebuild task
- Signal of confidence in the Awesome Copilot + Bradygaster brief
- Short-term investment for higher-fidelity output

#### Constraints Preserved

- Brief unchanged: Awesome Copilot UX + Bradygaster style
- Acceptance rubric applies: `.squad/decisions/inbox/mon-mothma-acceptance-rubric.md`
- Discovery-first IA; no install wall above fold
- Light docs-style theme; rose accent; minimal motion

#### Next Step

R2-D2 executes rebuild with GPT-5.4. Pre-ship validation against acceptance rubric before merge.

---

### Landing Page Redesign & Platform Rebuild

**Owner:** R2-D2 (Platform Engineer) + Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** ✅ Complete — Live on GitHub Pages  
**Commit:** Main branch  
**GitHub Pages:** Auto-deployed from `dist/`

#### Decision

**APPROVED.** Landing page rebuilt using Awesome Copilot as primary UX/IA reference and Bradygaster Squad as primary visual reference. Platform stack migrated to Astro 5.7 + Tailwind CSS 4.1.

#### What Was Built

R2-D2 rebuilt the public landing page around:

1. **Awesome Copilot UX Pattern** — Hero → search → browse cards
   - Single search input, flat card grid
   - Zero facets, zero filter drawers, zero multi-select complexity
   - Discovery-first IA with primary CTA: "Browse squads"

2. **Bradygaster Squad Visual Language (Iteration 1)**
   - Dark gradient backdrop (#07111b)
   - Cyan accents (#78d4ff)
   - Pill-shaped buttons
   - Glassmorphic panels with restrained glow
   - No heavy motion; subtle visual polish only

3. **Static, Data-Driven Implementation**
   - Powered by `squads.json`
   - Hash-based deep linking (`#squad/{id}`)
   - Search + scroll interaction model
   - Responsive breakpoints (960px, 720px)
   - Accessibility: WCAG AA, skip link, focus management

#### Acceptance Criteria (Phase 1 — Met)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Awesome Copilot = UX/IA reference | ✓ PASS | Hero → search → browse cards. Single search input, flat card grid, zero facets. |
| Bradygaster Squad = visual reference | ✓ PASS | Dark gradient, cyan accents, pill buttons, glassmorphic panels, restrained glow. |
| No leading install wall | ✓ PASS | "Browse squads" is primary CTA. Getting-started content in secondary "How it works" card below fold. |
| No invented dashboard/facet/filter experience | ✓ PASS | Zero filter drawers, zero facet counts, zero multi-select. Only interaction is search-and-scroll. |
| Astro 5.7 + Tailwind 4.1 | ✓ PASS | Stack aligned with Squad docs; `npm run dev`, `npm run build`, `npm run preview` working. |
| Local preview gate functional | ✓ PASS | `npm run preview` validates pre-publish. Integrated into PR checklist. |

#### Validation

- Build: ✓ PASS
- Validate: ✓ PASS
- Test: ✓ PASS
- GitHub Pages deployment: ✓ SUCCESS (automatic from `dist/`)

#### Impact

This rebuild establishes the current baseline for public Pages UX and platform architecture. The Astro + Tailwind stack is now aligned with Squad docs and provides reliable local dev/preview/build workflow.

#### Next Phases

- **Phase 2 (Visual Refinement):** Light docs-style revision (see: Visual Pass: Light Docs-Style Redesign)
- **Phase 3 (Scale):** Advanced filtering, category browsing, performance optimization only if catalog growth and user feedback justify them

#### Related Decisions (Context)

**Landing Page Information Architecture (Superseded)** — Original discovery-first + tier-2 filter spec was architecturally sound but temporally premature. Concepts will be valuable for 20+ squad catalogs. Current rebuild simplifies to MVP scope (1-5 squads).

**Bradygaster Squad Style Alignment** — Visual polish concepts adopted (subtle motion, glowing backgrounds). Heavy animations deferred to Phase 2+.

**Model Override: GPT-5.4** — Override used successfully for rebuild pass. Improved reasoning and code quality on complex task.

**Design Leadership: Poe on Landing Page** — Poe assumed design leadership after rebuild; visual refinement direction follows from Poe's review.

---

### Design Leadership: Poe on Landing Page

**Owner:** Poe (UX Expert)  
**Assigned:** 2026-03-16T19:58:39Z  
**Status:** Active  
**Scope:** Visual direction, redesign leadership

#### Decision

Poe assumes design leadership for landing page visual refinement and UX direction. Awesome Copilot (awesome-copilot.github.com) is the primary reference guide for UX/IA patterns. Playwright required for design validation and testing.

#### Rationale

- Prior implementation-led approach was rejected; design leadership model corrects this
- Awesome Copilot exemplifies the discovery-first, search-primary UX pattern needed
- Playwright provides reproducible testing framework for design changes
- Clear ownership prevents decision cycles and reduces ambiguity

#### Implications

- Design decisions flow through Poe; implementation follows design direction
- Awesome Copilot sets the UX bar (hero → search → cards model)
- Playwright tests protect against regression in interaction design
- Team defers to Poe on UX/visual trade-offs
- Visual acceptance criteria are encoded as runnable tests (see: Wedge Visual Acceptance Harness)

#### Current Status (Session)

Poe's initial dark glassmorphic redesign was rejected by Wedge; visual refinement redirected to light docs-style approach. Padme implemented approved revision; see **Visual Pass: Light Docs-Style Redesign**.

---

### Visual Pass: Light Docs-Style Redesign

**Owner:** Padme (Visual Designer)  
**Date:** 2026-03-18  
**Status:** ✅ Approved  
**Reviewed by:** Wedge (UX Tester), C-3PO (Schema), R2-D2 (Platform)

#### Decision

**APPROVED.** Complete visual overhaul moving from dark glassmorphic design to light, docs-style interface aligned with Bradygaster Squad visual language.

#### What Changed

1. **Color palette** — Switched from dark navy/black to white page chrome (#ffffff, #fafafa) with dark neutral text (#18181b, #52525b)
2. **Accent discipline** — Rose (#dd2d60 / squad-600) as single primary accent; removed cyan and navy color families
3. **Surface treatment** — Flat white surfaces with subtle borders instead of backdrop blur and heavy shadows
4. **Radius system** — Reduced from 28–32px to 6–12px (rounded-lg consistent across cards, buttons, inputs, modal)
5. **Hero CTA pair** — Added explicit primary (solid rose) and secondary (neutral bordered) buttons
6. **Card consistency** — All resource cards use identical neutral styling instead of per-card accents
7. **Content cleanup** — Removed self-referential style description

#### Validation Results

- `npm run build` — ✅ Passed
- `npm run preview` — ✅ HTTP 200 on `/agency/`
- Local preview — ✅ Confirmed light docs-style visual output
- **Playwright visual harness** — ✅ All six criteria passed (see: Visual Acceptance Harness)
- **Schema & standards** — ✅ npm run validate && npm test passed
- **Platform readiness** — ✅ Build/preview smoke passed; ready for Pages deploy

#### Acceptance Criteria (Wedge Visual Harness)

| # | Criterion | Result |
|---|-----------|--------|
| 1 | Lighter shell | ✅ PASS — `body { background: #ffffff; color: #18181b }` |
| 2 | Rose-led hero CTA pair | ✅ PASS — Primary `bg-squad-600` (#dd2d60); Secondary neutral bordered |
| 3 | Calmer bordered surfaces | ✅ PASS — Zero `backdrop-blur`/`backdrop-filter` classes |
| 4 | Restrained accent use | ✅ PASS — Two-token palette only: `squad-*` + `surface-*`; no cyan/navy |
| 5 | Tighter radius/border | ✅ PASS — All in 4–16px range; `rounded-full` reserved for brand pill |
| 6 | Style sentence removed | ✅ PASS — Not present in source or built HTML |

#### Deployment Status

- Artifact location: `/dist/` (ready for GitHub Actions)
- Workflow: `.github/workflows/deploy-pages.yml` (no changes required)
- Base path: `/agency` (configured)
- Risk: Low (static generation, familiar data flow, 85% content)
- **Ready for merge; Pages deployment on merge.**

#### Related Decisions (Context)

**Tech Stack Alignment & Local Preview Mandate** — This redesign fulfills the local preview requirement. All major UX changes now pass `npm run build && npm run preview` before publication.

**Wedge UX Tester — Squad Roster Addition** — This approval leverages Wedge's visual acceptance harness (see below).

---

### Wedge Visual Acceptance Harness

**Owner:** Wedge (UX Tester)  
**Date:** 2026-03-18  
**Status:** ✅ Implemented  
**Artifact:** `tests/visual-acceptance.test.mjs`

#### Decision

Created a focused Playwright-based test suite that encodes six acceptance criteria as runnable assertions for visual redesign review. Criteria derived from Wedge's prior REJECT feedback on glassmorphic design.

#### Acceptance Criteria (Six Checks)

1. **Lighter shell** — Body/HTML background luminance > 160/255
2. **Rose-led hero CTA pair** — At least one hero button has rose background (R>180, G<120, B<130)
3. **Calmer bordered surfaces** — Zero elements have `backdrop-filter` blur active
4. **Restrained accent use** — Zero cards/buttons/badges have cyan background or border colour
5. **Tighter radius/border** — Zero hero/card elements have `border-radius` > 20px
6. **Style sentence removed** — Page text does not match `/styled to track/i` patterns

#### How to Run

```
npm run test:visual
```

- Builds site, starts preview server on port 4322
- Runs six Playwright checks
- Screenshots land in `tests/screenshots/visual-acceptance/`

#### Integration with Existing Tests

- `npm test` now explicitly targets `tests/registry.test.mjs` (prevents browser test auto-discovery in CI)
- Existing test infrastructure unchanged in intent; scoped more precisely
- Visual harness remains opt-in (`npm run test:visual`) for local design review

#### Review Method Note

Playwright browser environment not available on original review host; visual review performed via source + compiled artifacts. For Tailwind/Astro static sites, compiled class names are direct proxies for computed styles — provides equivalent signal on all criteria.

---

### Wedge UX Tester — Squad Roster Addition

**Logged by:** Scribe  
**Date:** 2026-03-17  
**Status:** ✅ Implemented  
**Related:** Wedge Visual Acceptance Harness

#### Decision

Added Wedge to squad roster as dedicated UX Tester with Playwright visual testing expertise.

#### Role Definition

- **Title:** UX Tester
- **Expertise:** Usability review, Playwright visual testing, screenshot-based acceptance checks
- **Ownership:** UX testing, visual regression checks, screenshot-based review
- **Collaboration:** Reads decisions.md, writes inbox entries, follows established squad workflow

#### Model Choice

**Selected:** Claude Sonnet 4.6  
**Rationale:** Screenshot-backed UX review and visual regression detection require high-quality perception and precision. Sonnet 4.6 provides best-in-class accuracy for pixel-level analysis and Playwright integration.

#### Team Implications

1. **Poe + Wedge split** — Poe focuses on design/IA; Wedge owns implementation verification
2. **Visual regression gate** — All UX changes pass Wedge before Poe's design review (test-first philosophy)
3. **Test automation baseline** — Establish Playwright + screenshot regression suite for landing page + squad cards
4. **Scaling** — Wedge unblocks visual testing as catalog grows; Poe focuses on larger design problems

#### Implementation

- `.squad/casting/registry.json` — Wedge entry added
- `.squad/team.md` — Wedge row added to roster
- `.squad/agents/wedge/charter.md` — Role definition documented
- `.squad/agents/wedge/history.md` — Project context logged

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
- Archive decisions older than 30 days if file exceeds ~20KB
