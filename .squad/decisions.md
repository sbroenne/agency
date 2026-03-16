# Squad Decisions

## Active Decisions

### Landing Page Information Architecture

**Owner:** Mon Mothma (Lead) + Poe (UX Engineer)  
**Date:** 2026-03-16  
**Status:** Proposed — awaiting implementation prioritization

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
- **Poe's summary:** `.squad/decisions/inbox/poe-wireframe-outline.md`
- **Mon Mothma's IA proposal:** `.squad/decisions/inbox/mon-mothma-ia-review.md`
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

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
- Archive decisions older than 30 days if file exceeds ~20KB
