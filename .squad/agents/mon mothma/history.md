# Mon Mothma — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** Lead
- **Joined:** 2026-03-16T18:01:28.014Z

## Session Overview

### Sessions 1-5 (2026-03-16 through 2026-03-18): Landing Page Direction & Launch

**Key work completed:**
1. **Session 1 (UX Analysis):** Reviewed current landing page and awesome-copilot.github.com. Identified tag scalability problem and recommended discovery-first hierarchy, search-centric filters, and progressive tag disclosure.
2. **Session 2 (IA Proposal):** Delivered concrete information architecture: Hero → Directory → Quickstart (move quickstart below fold), collapsible Focus filters with inline search, and grouped tag disclosure in detail views.
3. **Session 3 (Launch Review):** Comprehensive validation of landing page implementation against decisions. Verified discovery-first hierarchy, filter behavior, accessibility, responsive design, and error handling. **Zero issues found** — all strategic decisions correctly implemented.
4. **Sessions 4-5 (Refinement & Approval):** Led team through headline revision ("Find your next squad"), SEO optimization, and docs audit. Drove consensus on marketing copy, meta descriptions, and team readiness.

**Key strategic contributions:**
- Established discovery-first principle: "Search scales infinitely; filter lists do not"
- Led headline evolution: from "Your codebase, staffed by AI" → "Find your next squad" (more specific, discovery-focused)
- Coordinated team feedback and decision merging (Poe's design ↔ R2-D2's platform recommendations ↔ marketing input)
- Validated marketplace readiness and approved team expansion (Lando addition, model preference)

**Outcomes:**
- Landing page launched with zero issues
- SEO pass completed
- Marketplace alias verification ready (Leia + C-3PO)
- Team expanded to 10 agents with clear specialization

---

## Recent Work

- **Supporting copy:** "Browse AI teams you can inspect, copy, and run in your own projects."
- **BaseLayout default meta:** "Find your next squad. Browse AI teams you can inspect, copy, and run."

**Criteria validation:**
1. ✅ Leads with discovery: "Find" + "Browse" (active discovery verbs)
2. ✅ 4 words (under ~6 ceiling)
3. ✅ Only promises deliverables: browse, inspect, copy, run — all real page actions

**Result:** Wedge approved; copy cleared for publish
**Files:** `src/pages/index.astro`, `src/layouts/BaseLayout.astro`

## 2026-03-19: Marketplace Architecture Sprint

Led marketplace readiness evaluation. Recommended Option 1 (terminology shift) as minimal-risk approach to position Agency as Squad Plugin Marketplace. Decision approved for immediate implementation. Published Scout squad as discovery assistant. Deferred Recruiter squad to 10+ squads milestone.

**Decisions Made:**
- Architecture: Terminology shift with no structural changes
- Scout Squad: Published as live discovery tool (2-member team)
- Recruiter Squad: Timing postponed; reserve slug for future
- Upstream Ready: Agency confirmed compatible with Squad ecosystem

---

## 2026-03-19: Marketplace Noise Prioritization

**Event:** Assessed and prioritized marketplace noise cleanup  
**Date:** 2026-03-19T09:57:18Z

**Decision:** Nice-to-have, not a must-fix. Deferred pending Squad CLI side improvements.

**Rationale:**
1. Functional health — Current implementation works; no bugs
2. Low urgency — UX noise, not a blocker
3. Squad-side design — Root-level pattern was deliberate Squad design; changes require CLI coordination
4. Backward compatibility — Moving aliases would break existing integrations
5. Priority alignment — Team focus on headline clarity and landing page SEO (higher-value work)

**Recommendation:**
- Leave agency as-is
- Coordinate with Squad CLI team (bradygaster/squad) for filtering or .squadignore support if needed
- Short term: Users can import from URL; medium term: wait for Squad upstream

**Merged to:** decisions.md (2026-03-19T09:57:18Z)

---

---

## 2026-03-19: Agency Restructure Proposal (Path 2: Ambitious)

**Event:** Two-path proposal for marketplace noise reduction  
**Date:** 2026-03-19T11:21:22Z  
**Mode:** Background collaboration with Leia  

**Proposal (Path 2 — Mon Mothma's Structural Reshape):**

Move canonical squad manifests from `squads/` to root level; retire the `squads/` directory layer.

**Result:**
- Eliminates symlink indirection; single source of truth
- Cleaner root namespace (one entry per squad, not doubled)
- Test fixtures isolated in `.squad/test-fixtures/` (hidden from marketplace)
- No external API change (registry output and manifest format identical)

**Changes Required:**
- `registry.mjs`: Update scanning logic (root instead of `squads/`)
- Moved manifests: Update schema refs
- Test fixtures: Relocate to `.squad/test-fixtures/test-squad/`
- Validation: Re-run `npm run validate && npm run build && npm test`

**Why This Path:**
- Eliminates conceptual confusion (symlink vs. canonical)
- Aligns with "discovery-first" positioning
- Simpler contributor mental model
- Removes one directory layer (reduces conceptual debt)

**Status:** Proposed; awaiting team decision.

**Risk Assessment:** Medium (structural change requiring full validation). Low blocker risk if build/validation re-run carefully.

**Cross-team note:** Path 1 (Leia) proposes conservative consolidation with minimal friction. Team to choose based on priorities.

**Team Memory:** Logged to `.squad/decisions/inbox/mon-mothma-agency-reshape.md` → merged to decisions.md

---

## 2026-03-19: Tooling Cleanup Review & Approval Authority

**Event:** Two-phase review of agency tooling consolidation  
**Status:** ✅ Initial rejection → Final approval  
**Dates:** 2026-03-19T13:45:00Z (reject) → 2026-03-19T12:47:00Z (approve)

### Phase 1: Review & Rejection (13:45)

**Work reviewed:** C-3PO's consolidation of schema/, scripts/, tests/, test/ under tooling/ namespace

**Critical blockers identified:**
1. Build system broken — package.json scripts reference root paths; files moved to tooling/
2. Test fixture persistence — squads/test/squad.json remained after move
3. Registry path hardcoding — tooling/scripts/lib/registry.mjs uncorrected

**Decision:** Reject C-3PO's pass. Require different agent for revision (protocol: don't let original author fix their own work).

**Escalation:** Routed to R2-D2 (Platform Engineer) with explicit blockers documented.

**Logged to:** `.squad/orchestration-log/2026-03-19T11:47:28Z-mon-mothma-review-1.md`

### Phase 2: Revision Approval (12:47)

**Work reviewed:** R2-D2's correction of all three blockers

**Fixes validated:**
1. ✅ `tooling/scripts/lib/registry.mjs` — Path resolution now derives from injected `repoRoot`
2. ✅ Stale fixture removed — `tooling/test/` directory deleted; consolidated in `.squad/test-fixtures/`
3. ✅ Build scripts corrected — `package.json` updated; internal workflow templates switched to modern npm patterns
4. ✅ Schema refs updated — `squads/agency/squad.json` and `squads/scout/squad.json` corrected to `../../tooling/schema/`

**All checks pass:**
- `npm run validate` ✓ (2 squads clean)
- `npm run build` ✓ (registry generated correctly)
- `npm test` ✓ (12/12 tests pass)
- Marketplace integrity ✓ (agency + scout preserved in registry)

**Verdict:** APPROVED. Structural fixes are sound and complete. Agency-side constraint satisfied (no core tooling changes). Ready for orchestration steps.

**Clarification note:** Schema path updates in manifests (root relative → `../../tooling/schema/`) are necessary architectural corrections, not constraint violations. They align manifests to actual repository structure.

**Logged to:** `.squad/orchestration-log/2026-03-19T11:47:28Z-mon-mothma-review-2.md`

---

## Learnings

### 2026-03-19: View Link Arbitration

**Event:** Resolved disagreement between Poe and Wedge on squad card "View →" link behavior.

**Analysis:**
The implementation shows that `SquadCard.astro` line 61 uses `squad.source.repository` for the View link, which points to the repo root (`https://github.com/sbroenne/agency`). However, the data in `squads.json` also includes `squad.source.directory` (e.g., `squads/agency`, `squads/scout`) — specific folder paths for each squad.

**Verdict:** Poe is correct. This is a UX bug.

**Rationale:**
1. **Data exists:** The registry already exposes `source.directory` per squad — it's being ignored
2. **User intent:** Clicking "View" on the Scout card should take the user to Scout's manifest, not to the shared repo root
3. **Discovery-first principle:** Our established doctrine is discovery-first; deep-linking to the actual squad folder honors this
4. **Modal distinction is moot:** Whether the card opens a modal or not doesn't change what "View" should mean externally — it should point to the squad, not the repo

**Decision:** The View link should compose the full GitHub URL: `{repository}/tree/main/{directory}` (e.g., `https://github.com/sbroenne/agency/tree/main/squads/scout`).

**Files to change:**
- `src/components/SquadCard.astro` — update href from `squad.source.repository` to a composed path using `squad.source.directory`
- Optionally, consider doing the same for `#modal-repo` in `site.js` (line 278)

**Logged to:** `.squad/decisions/inbox/mon-view-link-verdict.md`

---

## 2026-03-19: View Link Arbitration — Final Verdict

**Event:** Resolved Poe vs. Wedge disagreement on squad card "View →" destination  
**Date:** 2026-03-19T18:12:22Z

**Summary:**
Two-agent input led to clear decision:
- **Poe:** This is a UX bug; View should link to squad-specific paths
- **Wedge:** Current behavior was verified as intentional; two-action pattern is correct

**Analysis:**
Wedge correctly identified that the two-action pattern (modal + external link) is intentional. However, the *destination* of the external link is a separate issue. Both squads linking to the repo root because they share `source.repository` is indeed a UX bug, because:
1. The registry already has `source.directory` per squad
2. "View →" should reveal the squad being viewed, not the generic repo
3. Aligns with established discovery-first principle

**Verdict:** ✅ **APPROVED** — Poe is correct; this is a bug.

**Decision:** Update View links to compose squad-specific GitHub URLs:
```
{source.repository}/tree/main/{source.directory}
```

**Files to change:**
- `src/components/SquadCard.astro` line 59–65
- `src/scripts/site.js` line 277–278 (modal button consistency)

**Design Alignment:** This honors discovery-first doctrine by deep-linking to the specific resource (squad folder), not a generic landing page.

**Status:** Approved. Awaiting implementation and validation.
