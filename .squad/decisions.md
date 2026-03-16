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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
- Archive decisions older than 30 days if file exceeds ~20KB
