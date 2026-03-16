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
