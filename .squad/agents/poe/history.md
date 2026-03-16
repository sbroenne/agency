# Poe — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** UX Engineer
- **Joined:** 2026-03-16T18:01:28.019Z

## Learnings

### UX Direction Review (2026-03-16)

**Problem:** Current UX won't scale with many tags. Quickstart dominates the page, relegating discovery.

**Analysis:**
- Reviewed current site: hero → quickstart (big) → filters (status + focus) → directory
- Benchmarked awesome-copilot.github.com: hero → search-first → browse categories → content
- Key insight: awesome-copilot uses **visual card browsing** for 8 categories + global search, not filter chip rows

**Recommendation:**
1. **Reorder hierarchy:** Move Quickstart below directory (or to separate page)
2. **Scale tag filtering:** Multi-select + searchable dropdown instead of chip rows
3. **Add category browsing:** Optional visual cards for "Browse by Use Case" (mimics awesome-copilot)
4. **Hero search:** Prominent global search input, not just "Browse squads" button
5. **Tradeoff:** Requires URL state management, but solves 20+ tag problem gracefully

**Decision recorded in:** `.squad/decisions.md` (merged from inbox)

**Team alignment:** Mon Mothma (Lead) provided complementary strategic framing on the same UX direction:
- Both recommend Directory above Quickstart (discovery-first)
- Both recommend multi-select + search-based filtering
- Both emphasize progressive disclosure to handle catalog growth

**Next steps:** Await team consensus and implementation prioritization.

---

### Landing Page Wireframe & Outline (2026-03-16)

**Status:** Concrete recommendation delivered.

**Artifact:** `.squad/artifacts/poe-landing-wireframe.md` (14KB, full specification)

**What I delivered:**
1. **Section-by-section layout** — Hero → Directory+Filters → Cards → Detail panel → Quickstart (accordion or separate page)
2. **Hero copy direction** — Lead with "Discover squads", not "Install Squad"; prominence on search input, not buttons
3. **Filter model for 20+ tags** — Multi-select checkboxes + searchable dropdown; facet counts show available results
4. **Card information hierarchy** — Refined density: title + eyebrow + tagline + 3 focus chips + member preview + metadata
5. **Text wireframes** — Full page layout ASCII art, component layouts, mobile considerations
6. **Implementation roadmap** — Phase 1 (reorder + multi-select), Phase 2 (category cards), Phase 3 (advanced search)
7. **Success metrics** — Time to card click, filter usage, detail panel opens, adoption funnel

**Key design decisions made:**
- Search input is primary CTA in hero (matches awesome-copilot pattern)
- Status filter remains single-select radio; Focus becomes multi-select checkboxes
- Quickstart moves below fold (recommend collapsible accordion for Phase 1 MVP)
- "Submit a squad" link elevated to hero buttons (growth lever)
- No breaking changes to existing HTML/CSS; mostly reordering + component iteration
- Preserve existing detail panel UX; refine card grid and filter panel

**Confidence level:** High. Wireframe is specific enough for dev handoff; design decisions align with team consensus (Mon Mothma's earlier framing on discovery-first + multi-select scaling).

---

### Scribe Cross-Agent Update (2026-03-16T19:05:07Z)

**Team validation:** Mon Mothma (Lead) reviewed the information architecture independently and converged on the same direction:
- Directory above Quickstart (discovery-first)
- Tier 1/Tier 2 filter structure: Status visible, Focus collapsible with inline search
- Progressive tag disclosure: Cards 1–2 tags, detail view full grouped list
- Copy principles: Browse first, install second

**Decision merged:** Inbox files merged into `.squad/decisions.md` with implementation guidance, success criteria, and artifact references.

**Status:** Ready for development team estimation and Phase 1 prioritization.

