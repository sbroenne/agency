# Poe — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** UX Engineer
- **Joined:** 2026-03-16T18:01:28.019Z

## Session Overview

### Early Sessions (2026-03-16): UX Direction & Landing Page Redesign

**Key work:**
1. UX direction review: analyzed awesome-copilot pattern (search-first + visual browsing) vs. current tag-filter scaling problem
2. Landing page wireframe specification: detailed IA proposal (Hero → Directory → Quickstart reordering, multi-select filters, progressive tag disclosure, Bradygaster visual polish)
3. Bradygaster style review: assessed motion language, visual traits, and alignment with current implementation
4. Landing page redesign implementation: delivered discovery-first hierarchy with multi-select searchable filters, detail pane with grouped tags, and glassmorphic panels

**Key decisions made:**
- Reorder hierarchy: Move Quickstart below fold; Directory above fold
- Filter scaling: Multi-select checkboxes + searchable dropdown (handles 50+ tags)
- Progressive disclosure: Cards show 1-2 tags + "+N more"; detail pane groups tags
- Visual treatment: Bradygaster-inspired animations (0.18s transforms), dark theme, accessibility (prefers-reduced-motion)

**Outcome:** Landing page redesign validated and merged. Ready for team feedback on next phase (mobile refinements, category cards).

---

## Recent Work

## Learnings

- 2026-03-19: Squad card "View" currently uses `source.repository`, so monorepo squads all land on the same repo root. For squad-specific browsing, derive the destination from `source.directory` plus `source.import.ref` (or `manifestPath`) instead.
- 2026-03-19: Reuse a shared source-link helper for both Astro cards and the site modal so squad source deep-links stay consistent. If `source.directory` is absent, fall back to the repository root instead of emitting a broken tree URL.

---

## 2026-03-19: Squad Card View Link Verdict

**Event:** UX bug confirmed and approved for fix  
**Date:** 2026-03-19T18:12:22Z

**Summary:**
Proposed that squad card "View →" links should target squad-specific folders, not repo root. Initial proposal confirmed as UX bug; Mon Mothma approved the fix.

**Verdict:** ✅ APPROVED

**Decision:** View links should compose GitHub tree URL using `source.directory`:
```
{source.repository}/tree/main/{source.directory}
```

**Changes required:**
- `src/components/SquadCard.astro` line 59–65
- `src/scripts/site.js` line 277–278 (modal button for consistency)

**Next:** Awaiting implementation. Orchestration logs and decision merged to `.squad/` reference system.

## 2026-03-19: Squad View Link Fix Completed

**Event:** Implementation complete  
**Date:** 2026-03-19T18:59:23Z

**Summary:**
Squad card and modal source links now deep-link to squad-specific directories using `{repository}/tree/main/{source.directory}` when directory metadata is available on GitHub repositories. Falls back to repository root for missing metadata or non-GitHub URLs.

**Implementation:**
- Updated `src/components/SquadCard.astro`
- Updated `src/scripts/site.js` modal action
- Added regression test coverage
- Validated with build and test suite

**Status:** ✅ COMPLETE
