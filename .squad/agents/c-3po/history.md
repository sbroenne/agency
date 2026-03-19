# C-3PO — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** Schema Engineer
- **Joined:** 2026-03-16T18:01:28.018Z

## Learnings

### Validation & Testing Infrastructure (2026-03-18)
- **validate** command: `node scripts/validate-squads.mjs` checks squad.json manifests against schema; passes cleanly on approved revisions
- **test** command: `node --test tests/registry.test.mjs` runs Node.js built-in test suite (2 tests); validates registry loads and counts correctly
- **test:visual** command: `npm run build && node --test tests/visual-acceptance.test.mjs` runs Playwright-backed acceptance tests after Astro build
- All commands exit cleanly with code 0 on schema-compliant revisions
- Squad count: Currently 1 validated manifest in the registry

### Project Review (2026-03-19)
- **Schema:** Comprehensive and well-structured (Draft 2020-12, strict AJV). Covers spec, id/slug/name, status, text bounds, focus array (1-8 items, unique), source (repo/dir/homepage/import), team (1-20 members with role/expertise).
- **Validation gaps:** No semantic validation of import config (path/ref required for sync types). No repo URL validation (could be 404). Slug/id uniqueness checks only at registry load time, not schema-level.
- **Test coverage weak:** Only 2 registry tests; NO negative tests. Missing: schema edge cases, duplicate detection, URI format, pattern matching, array uniqueness, text bounds, derived field normalization.
- **Visual suite (310 lines):** Good architecture for color/style checking but gaps vs. team IA decision: no test for content reordering (Directory→Quickstart), multi-select filters, facet counts, tag disclosure UI, or filter state persistence.
- **UX gaps:** Current IA missing Directory/Quickstart reorder, search-first + progressive disclosure of filters, facet-count display, "+N more" tag clickability. Decisions.md specifies three IA moves; only hero + card truncation implemented.
- **Build quality:** Clean pipeline (validate→build-registry→astro). All scripts exit cleanly; no warnings. But missing pre-commit validation and error boundaries.
- **Registry normalization:** Links derived, focus/expertise arrays sorted, members aggregated. Assumes GitHub HTTPS URLs; could fail on SSH or non-GitHub hosts.

**Key finding for team:** UX/IA is 40% complete vs. approved decisions. Test suite covers happy path only — no guardrails for schema evolution at 20+ squads.

---

## Full Project Review: Schema Assessment — 2026-03-19

**Event:** Schema and test coverage review completed  
**Date:** 2026-03-19T05:49:18Z

**Critical Finding:** Negative test suite MISSING; only happy path tested.
- Blocks: Growth beyond 1 squad; each new squad doubles validation risk
- Action: Add 5–10 negative test fixtures (invalid JSON, duplicates, type mismatches, etc.)

**Secondary Findings:**
- UX/IA 40% complete vs. spec (Directory/filter missing)
- GitHub URL parsing assumes HTTPS format; fails on SSH/non-GitHub hosts
- Import semantics not enforced (fork-sync path/ref validation missing)

**Strengths validated:**
- Schema structure comprehensive, strict mode enforced
- ID/slug validation (kebab-case enforcement)
- Text bounds on all fields
- Build pipeline clean (<2s)

All findings merged into `.squad/decisions.md` section "Full Project Review — 2026-03-19".

**Next:** Add negative tests before accepting scalable squad submissions.
