# Leia — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** GitHub Integrator
- **Joined:** 2026-03-16T18:01:28.016Z

## Learnings

### 2026-03-18: Full Repository Review

**Summary:** Conducted comprehensive review of all repository-facing surfaces (README, CONTRIBUTING, GitHub workflows, templates, automation). Identified 7 significant friction points affecting contributor and release workflows.

**Key Findings:**
- Undefined "major UX change" threshold creates ambiguity in PR review process
- Schema changes not explicitly flagged in PR template — risk of oversight
- Upstream sync workflow documented but lacks configuration guidance
- No distinction between squad submission vs. code contribution paths
- Visual testing expectations not explained in CONTRIBUTING
- Node version requirement (20.0.0+) not in README/CONTRIBUTING despite being in package.json
- Bradygaster Squad docs reference in PR template has no link

**Approach:** Read all repo-facing docs, workflows, templates, and configuration; synthesized into 7 distinct problem areas with recommendations.

**Outcome:** Documented findings for team review; decision to follow up on "major UX change" definition and schema change flagging as highest-priority items for clarity.

---

## Full Project Review: Repository & Process Assessment — 2026-03-19

**Event:** Repository surface review completed; 7 friction points identified  
**Date:** 2026-03-19T05:49:18Z

**2 Blockers (Required for Public Launch):**
1. "Major UX Change" threshold undefined in CONTRIBUTING/PR template
2. Schema changes not flagged in PR template checkbox

**5 Should-Do Items (Required for Growth Phase):**
3. Upstream sync workflow underdocumented
4. No entry point for non-squad contributions (site code/tests/docs)
5. Visual testing expectations unstated (npm run test:visual)
6. Node version requirement missing from README
7. Bradygaster Squad docs link missing from PR template

**Effort estimate:**
- Blockers: 2–3 hours (PR template + CONTRIBUTING updates)
- Should-do items: 2–3 hours total

All findings merged into `.squad/decisions.md` section "Full Project Review — 2026-03-19".

**Recommendation:** Implement blockers immediately; schedule should-do items for next PR cycle.
