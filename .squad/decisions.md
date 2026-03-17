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
- ROI: Better mobile experience; improved discoverability

**Phase 3 (Future) — 2+ sprints**
- [ ] Advanced search syntax (`focus:api author:sarah`)
- [ ] Save/bookmark filter combinations
- [ ] Squad recommendations based on history
- ROI: Power-user retention; data-driven discovery

#### Convergence Note

**Poe (UX Engineer)** and **Mon Mothma (Lead)** independently converged on identical recommendations:
- Directory above Quickstart (discovery-first)
- Multi-select + search-based filtering
- Reduced cognitive load per card
- Tier 1/Tier 2 filter structure for scalability

This convergence validates confidence for team implementation.

#### Artifacts & Decision Records

- **Wireframe spec:** `.squad/artifacts/poe-landing-wireframe.md`
- **Implementation notes:** `.squad/decisions/poe-landing-redesign.md`
- **Success criteria:** Phase 1: time to first card click ↓, directory scroll depth ↑, filter usage ↑

---

### Public Pages Squad Browser

**Owner:** Poe (UX Engineer)  
**Date:** 2026-03-16  
**Status:** Implemented

#### Decision

Shape the public directory as a static, data-driven browser in `public/` with search, filters, roster previews, and hash-based deep links instead of per-page routing.

#### Rationale

- GitHub Pages handles static assets reliably without app routing setup
- Hash links (e.g., `#squad/agency`) make detail views shareable without rewrite rules
- Standalone `squads.json` keeps the browse UX ready for future generated or submitted squad data

---

### GitHub Flow Design

**Owner:** Leia (GitHub Integrator)  
**Date:** 2026-03-16  
**Status:** Implemented

#### Changes

1. **Structured GitHub issue forms** — Bug, feature, and chore submissions enter same `squad` triage path with type metadata
2. **PR template + validation** — `squad-submission-validate.yml` requires linked issues, validation notes, and explicit upstream-sync intent before ready
3. **PR review state mirroring** — `squad-pr-review.yml` mirrors PR state into `status:*` and `review:*` labels for queue visibility
4. **Upstream sync automation** — `squad-upstream-sync.yml` fast-forwards automatically or opens `sync:upstream` PR when review needed

### Bradygaster Squad Style Alignment

**Owner:** Poe (UX Engineer)  
**Date:** 2026-03-16  
**Status:** Recommendation — Ready for Implementation Prioritization

#### Decision

Adopt Bradygaster Squad's **visual/motion language** while preserving our **discovery-first architecture**.

#### Rationale

1. **Structural already aligned:** Both Bradygaster and our prior IA recommendation follow a discovery-first pattern (hero → main content → supporting content). No rework needed.

2. **Visual polish is additive:** Bradygaster's signature traits—floating animations, 0.18s hover transforms, glowing backgrounds—are refinement, not replacement. Our site already has the foundation (glassmorphic panels, dark theme, grid layouts).

3. **Motion improves UX:** Subtle animations (2-3px hover lift, floating glows) signal interactivity without adding cognitive load.

#### What Changes

**Phase 1: Motion (1-2 hrs, low risk)**
- Add `@keyframes float-slow` animation (8s cycle) to background gradient orbs
- Add `transition: transform 0.18s ease;` to all buttons, cards, links
- Add `transform: translateY(-2px)` hover state to interactive elements
- Respect `prefers-reduced-motion` media query

**Phase 2: Already Decided**
- Reorder: Directory above Quickstart (discovery-first)
- Scalable filters: Search-first + collapsible groups
- Card UI: Refined density with progressive tag disclosure

**Phase 3: Optional**
- Category browsing cards ("Browse by Focus")
- Animated hero stats counters
- Faceted search syntax

#### What Stays

- Two-column layout (Directory + Detail panel)
- Card grid browsing experience
- Multi-select filter model
- Hero → Directory → Quickstart hierarchy
- Existing color scheme (dark + cyan accent)

#### Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Animation fatigue on low-spec devices | Use `prefers-reduced-motion`; limit to 1-2 animations per viewport |
| Mobile responsive issues | Test 320px+; use clamp() for sizing; relative positioning for glows |
| GPU load with backdrop-filter + animations | Profile on real devices; consider `@supports` fallback for blur |
| Brand feels derivative | Keep our specific directory content; only borrow motion aesthetics |
| Color contrast on new elements | Verify WCAG AA on all text/buttons |

#### Success Metrics

- Users perceive site as polished and modern (qualitative)
- No performance regression on mobile (page load < 2s)
- All interactive elements have consistent hover feedback
- Animation respects accessibility preferences

#### Next Step

When team prioritizes Phase 1, assign to dev for CSS enhancement (no JS required).

---

### Bradygaster Docs Site Addendum

**Owner:** Poe (UX Engineer)  
**Date:** 2026-03-16  
**Reviewed:** https://bradygaster.github.io/squad/blog/028-new-docs-site/  
**Status:** Reinforces current recommendation; refinements identified

#### Summary

The Bradygaster blog post validates and refines our discovery-first recommendation. No architectural changes; three refinement opportunities identified.

#### What the Post Reinforces

**Layout & Navigation Clarity**
- Bradygaster's complete Astro rewrite prioritizes **navigation context** over visual polish
- PR #298 specifically added "active link highlighting" and "scroll-to-active sidebar"—proving that users value *knowing where they are*
- Our discovery-first IA + progressive disclosure aligns perfectly with this principle

**Content Hierarchy**
- The post emphasizes "complete rewrite" and "docs as primary destination," not installation instructions
- Mirrors our recommendation: Directory (discovery) above fold; Quickstart (adoption) below fold
- Validates that browsing >> installing in the user's mental model

#### Copy Patterns Worth Borrowing

1. **"Recommended way" callouts**
   - Quote: "The recommended way to use Squad is through GitHub Copilot CLI: `copilot --agent squad`"
   - Applies to us: Add explicit callout in Directory hero copy, e.g., "Browse squads by focus area or search—the fastest way to find what you need."

2. **Safety callouts for power-user actions**
   - Quote: CI/CD page now ships with cron schedule "commented out by default" + warning about GitHub Actions minutes consumption
   - Applies to us: Frame "Submit a squad" CTA with safety-first copy and link to CONTRIBUTING.md

3. **Contributor/community framing**
   - Credits contributors prominently; treats squad submissions as community co-creation
   - Future path: Link squad authors and repos in detail view; frame discovery as a gateway to contribution

#### Does This Change Our Recommendation?

**No.** The post reinforces the direction already decided:
- Discovery-first IA ✓
- Scalable filtering ✓
- Bradygaster visual style as refinement layer ✓

The blog post adds *detail-level validation* (scroll-to-active, callout patterns, contributor framing), not strategic changes.

#### Strongest Takeaway: Scroll-to-Active for Detail Context

**Implementation idea:** When a user clicks a squad card or selects a tag filter, the detail pane should:
1. Open with the relevant section visible (e.g., filtered by "AI" tag → scroll to "Focus Areas" section)
2. Highlight the clicked tag in its group

**Why it matters:** Borrowed from Bradygaster's docs sidebar behavior. Small detail, outsized UX impact—reduces cognitive load and reinforces navigation context.

**Phase:** Phase 2 enhancement (after reorder + multi-select filter delivery).

#### Recommendations for Implementation

1. Update hero copy to include "recommended way" callout (Phase 1)
2. Add safety/framing callout to "Submit a squad" button (Phase 1)
3. Implement scroll-to-active in detail pane (Phase 2)
4. Plan contributor/author linking as future feature (Phase 3)

---

### Technology Stack: Astro + Tailwind Adoption

**Owner:** R2-D2 (Platform Engineer)  
**Date:** 2026-03-16  
**Status:** Recommendation — Ready for Implementation Prioritization

#### Decision

Adopt Astro 5.7 and Tailwind CSS 4.1 from Bradygaster's docs stack. Defer Pagefind.

#### Rationale

1. **Astro reduces maintenance debt:** 80% less HTML boilerplate via `.astro` components. Current custom build script replaced by industry-standard static generator. Minimal deployment risk (Pages still gets identical static output).

2. **Tailwind improves DX:** 70% smaller CSS footprint via tree-shaking. Dark mode built-in; responsive utilities free. Single source of truth in `tailwind.config.ts`.

3. **Pagefind is premature:** Adds 60KB+ JS bundle for a problem not yet real. Multi-select filters + search-first UX (already decided, Phase 1) is the primary discovery entry. Revisit when squad count ≥ 20 or user feedback surfaces "I can't find X."

#### What to Adopt

**Astro 5.7 (Phase 0)**
- Migration: ~2 days
- Risk: Low (drop-in replacement; revert is single git commit)
- Output: Visually identical site, cleaner codebase

**Tailwind CSS 4.1 (Phase 1)**
- Migration: ~4 hours
- Risk: Low (tool-assisted; integrate with Astro work)
- Outcome: Smaller bundle, faster responsive iterations, visual alignment with Bradygaster ecosystem

#### What to Skip

**Pagefind (Phase 3, conditional)**
- Current IA provides search-first UX through multi-select filters
- Bundle cost not justified until catalog explodes or feedback demands full-text search
- Timeline: 8–12 weeks out; revisit at squad count ≥ 20

**Content Collections (future)**
- Not applicable to current data-driven site (squads.json + hash routing)
- Valuable when you own guides, contributing workflows, or architectural docs

#### Success Criteria

- [ ] Site renders identically at GitHub Pages
- [ ] Build time ≤ 5s on M1 Mac
- [ ] Bundle size unchanged or smaller
- [ ] No Pages deployment friction
- [ ] At least one team member owns Astro documentation

#### Dependencies & Sequencing

**Can run in parallel with:**
- IA Phase 1 (reorder Directory above Quickstart, multi-select filters)
- Bradygaster motion refinements (optional visual style alignment)

**Blocks:** None. Pure refactor.

#### Timeline

If prioritized next: 2.5 days (Astro + Tailwind combined)  
If after IA Phase 1: 3 days (buffer for parallel work)

---

### Landing Page Redesign — MVP Reset (Revision Direction)

**Owner:** Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Direction provided; awaiting revision & team review  
**Related:** Landing Page Information Architecture (superseded version), Bradygaster Squad Style Alignment

#### Problem

User rejected landing page redesign as "over-engineered for premature scale." Implementation correctly executed discovery-first IA specification, but specification was designed for 50+ squad catalog. Actual catalog: 1 squad. Result: complex filtering UI, hero bloat, and discovery-first tone felt inappropriate for early-stage registry where submission-first messaging is needed.

#### Root Cause

**Hypothesis mismatch:** Specification identified filter complexity as the bottleneck. Actual bottleneck is contributions. Over-engineering before problem manifests creates friction and intimidates potential contributors.

**Scale mismatch:** Built for anticipated growth; deployed too early.

**Tone mismatch:** Led with discovery ("Discover our squads") when early stage needs clarity on submission ("Submit your squad via PR").

#### Strategic Pivot: Build for Today, Not Tomorrow

**Philosophy:** Iterate with catalog growth. Add filter complexity only when users report "I can't find X" or catalog exceeds 5-10 squads.

**Scope Reset:** MVP simplification focusing on:
1. Reduce interaction complexity (remove app-like state management)
2. Reorder for contribution (Quickstart above Directory)
3. Reduce visual noise (simplify CSS, remove stats/callouts/animations)
4. Clarify submission pathway (primary CTA, clear language)

#### Concrete Changes

**Hero (Drastically Reduced)**
- Remove stats boxes, callout sections, hero search form
- Reduce to: logo + tagline + 2 CTAs ("Submit a Squad", "Browse what's here")
- Estimate: -40 lines HTML, -100 lines CSS

**Quickstart (Moved Up, Expanded)**
- Move from below fold to immediately after hero
- Expand from collapsed detail to always-visible section
- Add "Why submit?" and "How to submit" copy
- New role: Primary submission pathway (not secondary detail)

**Directory (Simplified)**
- Remove: Focus filter drawer, facet counts, multi-select state mgmt, progressive tag disclosure
- Keep: One search input, basic status filter (All/Live), hash routing
- Reduce card template: Remove "+N more" logic, show name + tagline + roster count

**Detail Panel (Minimal)**
- Remove: Tag grouping by category, tag-based filtering, interactive affordances
- Simplify to: Squad name + source link + mission + members + resource links
- Reduce CSS: Remove section styling complexity

**Visual Design (Tone Down)**
- Remove body float animations, hero stats/callouts styling
- Reduce shadow depth, simplify panel chrome
- Keep dark theme + cyan accents, glassmorphic panels (if perf-neutral)
- CSS target: ~400 lines (from ~900)

#### Must-Keep Preservation

- ✓ Dark theme (dark navy + cyan accent)
- ✓ Hash-based deep linking (`#squad/{id}`)
- ✓ Responsive breakpoints (960px, 720px)
- ✓ Accessibility: skip link, ARIA, heading hierarchy, focus management
- ✓ squads.json as data source
- ✓ Glassmorphic panels (if no performance regression)

#### Success Criteria

1. **Clarity:** User immediately sees "This is a registry; submit via PR"
2. **Simplicity:** <400 lines CSS, <150 lines effective JS (no filter state mgmt)
3. **Performance:** Page loads <1s, no mobile jank
4. **Accessibility:** WCAG AA pass, focus visible, skip link functional
5. **Scalability (Future):** Can grow 1→5→50 squads without redesign; filter complexity added only when justified by content

#### Implementation Assignment

**Revision Author:** R2-D2 (Platform Engineer)  
**Timeline:** 4-5 hours (HTML + JS + CSS cleanup + test + deploy)  
**Guidance:** Detailed spec in `.squad/decisions/inbox/mon-mothma-redesign-direction.md` (will be archived after execution)

#### Scaling Philosophy for Future

**Original decision** (Landing Page Information Architecture) was architecturally sound but temporally premature:
- IA recommendation: correct for mature registry
- Timing: should execute after 5-10 squads submitted, not before launch

**New principle:** 
- **Phase 1 (MVP, now):** Simplicity. Submission-first tone. One search input. Minimal filtering.
- **Phase 2 (5-10 squads):** Add tier-2 collapsible filters *only if users ask*.
- **Phase 3 (20+ squads):** Faceted search, category browsing, advanced UX.

**Key Learning:** Don't solve problems that don't exist yet. Premature complexity defers value delivery.

#### Artifacts & Decision Records

- **Orchestration log:** `.squad/orchestration-log/2026-03-16T20:45:00Z-mon-mothma.md` (rejection analysis + direction)
- **Revision sprint:** `.squad/orchestration-log/2026-03-16T20:45:30Z-r2-d2.md` (R2-D2 task initiation)
- **Session log:** `.squad/log/2026-03-16T20:45:00Z-redesign-rejection-pivot.md` (detailed context for team)
- **Implementation guidance:** `.squad/decisions/inbox/mon-mothma-redesign-direction.md` (detailed spec for changes, to be archived post-completion)

#### Related Decisions (Context)

**Landing Page Information Architecture** (Superseded version) — The IA was sound; timing was wrong. Architecture concepts (discovery-first, tier-2 collapsible filters, progressive disclosure) will be valuable when catalog justifies them.

**Bradygaster Squad Style Alignment** — Visual polish concepts (subtle animations, glowing backgrounds) deferred; focus on interaction simplification first, styling can layer back later.

**Technology Stack: Astro + Tailwind Adoption** — Deferred; current static stack sufficient for simplified MVP. Revisit after redesign ships.

---

### Model Override: GPT-5.4 for Landing Page Rebuild

**Owner:** User (Stefan Broenner)  
**Date:** 2026-03-16  
**Status:** Active  
**Scope:** R2-D2 rebuild pass

#### Decision

Override default model (Codex) to **GPT-5.4** for the landing page rebuild task.

#### Rationale

- Improved reasoning and code quality on complex rebuild task
- Signal of confidence in the Awesome Copilot + Bradygaster brief
- Short-term investment for higher-fidelity output

#### Constraints Preserved

- Brief unchanged: Awesome Copilot UX + Bradygaster style
- Acceptance rubric applies: `.squad/decisions/inbox/mon-mothma-acceptance-rubric.md`
- Discovery-first IA; no install wall above fold
- Glassmorphic dark theme + cyan accent; subtle motion

#### Next Step

R2-D2 executes rebuild with GPT-5.4. Pre-ship validation against acceptance rubric before merge.

---

### Landing Page Rebuild — Approved & Deployed

**Owner:** R2-D2 (Platform Engineer) + Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Complete — Live on GitHub Pages  
**Commit:** e13ebfb  
**GitHub Pages Run:** 23162488700

#### Decision

**APPROVED.** Landing page rebuild using Awesome Copilot as primary UX/IA reference and Bradygaster Squad as primary visual reference passes all acceptance criteria. Committed to `main` and deployed successfully.

#### What Was Built

R2-D2 rebuilt the public landing page around:

1. **Awesome Copilot UX Pattern** — Hero → search → browse cards
   - Single search input, flat card grid
   - Zero facets, zero filter drawers, zero multi-select complexity
   - Discovery-first IA with primary CTA: "Browse squads"

2. **Bradygaster Squad Visual Language**
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

#### Acceptance Criteria (All Met)

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Awesome Copilot = UX/IA reference | ✓ PASS | Hero → search → browse cards. Single search input, flat card grid, zero facets. |
| Bradygaster Squad = visual reference | ✓ PASS | Dark gradient, cyan accents, pill buttons, glassmorphic panels, restrained glow. |
| No leading install wall | ✓ PASS | "Browse squads" is primary CTA. Getting-started content in secondary "How it works" card below fold. |
| No invented dashboard/facet/filter experience | ✓ PASS | Zero filter drawers, zero facet counts, zero multi-select. Only interaction is search-and-scroll. |

#### Validation

- Build: ✓ PASS
- Validate: ✓ PASS
- Test: ✓ PASS
- GitHub Pages deployment: ✓ SUCCESS (run 23162488700)

#### Impact

This rebuild supersedes all prior MVP-reset direction. Team members should treat this as the current baseline for public Pages UX. Next iterations can layer on complexity (multi-select filters, advanced search, category browsing) only when catalog growth and user feedback justify them.

#### Related Decisions (Context)

**Landing Page Information Architecture (Superseded)** — Original discovery-first + tier-2 filter spec was architecturally sound but temporally premature. Concepts will be valuable for 20+ squad catalogs. Current rebuild simplifies to MVP scope (1-5 squads).

**Bradygaster Squad Style Alignment** — Visual polish concepts adopted (subtle motion, glowing backgrounds). Heavy animations and contributor framing deferred to Phase 2+.

**Model Override: GPT-5.4** — Override used successfully for rebuild pass. Improved reasoning and code quality on complex task.

### Design Leadership: Poe on Landing Page Redesign

**Owner:** Poe (UX Expert)  
**Assigned:** 2026-03-16T19:58:39Z  
**Status:** In Progress

#### Decision

Poe assumes design leadership for landing page redesign. Awesome Copilot (awesome-copilot.github.com) is the primary reference guide for UX/IA patterns. Playwright required for design validation and testing.

#### Rationale

- Prior implementation-led approach was rejected; design leadership model corrects this
- Awesome Copilot exemplifies the discovery-first, search-primary UX pattern we need
- Playwright provides reproducible testing framework for design changes
- Clear ownership prevents decision cycles

#### Implications

- Design decisions flow through Poe; implementation follows
- Awesome Copilot sets the UX bar (hero → search → cards model)
- Playwright tests protect against regression in interaction design
- Team defers to Poe on UX/visual trade-offs

---

### Tech Stack Alignment & Local Preview Mandate

**Owner:** Stefan Broenner (User)  
**Date:** 2026-03-17  
**Status:** Active

#### Decision

**DIRECTIVE.** Effective immediately:

1. **Tech Stack Alignment:** Squad site must use the same technology stack as Squad docs if it does not already. Audit and align stack components.
2. **Local Preview Mandate:** Every major UX change must have a local preview available before publishing to production. This is now mandatory, not optional.

#### Rationale

- Documentation and product should share dependencies to reduce context switching and maintenance burden
- Local preview gates prevent regression and allow design review before deployment
- User requirement — captured for team memory

#### Implementation Scope

- [ ] Audit current site tech stack vs. Squad docs stack
- [ ] Identify gaps and plan alignment work
- [ ] Establish local preview workflow (e.g., `npm run dev` or equivalent)
- [ ] Document preview process in CONTRIBUTING.md or equivalent
- [ ] Integrate preview validation into PR review checklist for major UX changes

#### Success Criteria

- Tech stack components match (versions, build tools, dependencies)
- Local preview workflow is documented and working
- Team enforces preview requirement for all major UX changes before publication

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
- Archive decisions older than 30 days if file exceeds ~20KB
