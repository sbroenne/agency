# Scribe — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** Session Logger
- **Joined:** 2026-03-16T18:01:28.021Z

## Learnings

### Wedge UX Tester — Squad Roster Addition (2026-03-17)

**Event:** Stefan Broenner requested UX tester with Playwright expertise for visual testing. Wedge was already cast and configured; task was to log the roster addition and formalize decision record.

**What was logged:**
1. **Orchestration entry:** `.squad/orchestration-log/2026-03-17T06-23-00Z-wedge-roster.md` — model selection rationale, roster impact, onboarding artifacts, next steps
2. **Decision inbox:** `.squad/decisions/inbox/scribe-wedge-roster.md` — decision record for merge to decisions.md (model: Sonnet 4.6, rationale, team implications)
3. **Registry check:** Verified Wedge already in `.squad/casting/registry.json` (created 2026-03-17T05:21:16.969Z); team.md already updated

**Model choice:** Claude Sonnet 4.6 (selected by Wedge's charter). Excellent fit for screenshot-backed UX review and visual regression detection. Alternative (GPT-5.4) would be equivalent but Sonnet 4.6 maintains Anthropic ecosystem consistency.

**Key learning:** Roster changes must include: (1) orchestration log with rationale + implications, (2) decision inbox entry for asynchronous review, (3) verification that registry + charter + team roster are in sync. Wedge's charter was pre-configured with the correct model choice, reducing my decision work.

**Decision record status:** Inbox entry created; pending Stefan's review/merge to decisions.md. Orchestration log complete; registry and team roster already reflect Wedge as active member.

---

### Tech Stack Alignment & Local Preview Mandate (2026-03-17)

**Processing:** User directive received from Stefan Broenner for tech stack alignment and mandatory local preview before major UX changes.

**What was logged:**
1. **Decision merge:** "Tech Stack Alignment & Local Preview Mandate" added to decisions.md with scope, rationale, and success criteria
2. **Identity update:** Shifted focus_area to tech stack audit + local preview workflow implementation  
3. **Orchestration log entry:** Created detailed event log at 2026-03-17T05:15:00Z

**Key learning:** User directives on production gates should be immediately formalized into decision records with implementation scope and success criteria. This prevents vague requirements from being misinterpreted downstream.

**Decision record status:** Directive merged into decisions.md; orchestration log created; team now has clear action items and success metrics.

---

### Landing Page Rejection & Redesign Cycle (2026-03-16)

**Facilitation:** Logged orchestration entries, session log, and decision merge for landing page redesign pivot.

**What was logged:**
1. **Orchestration entry (Mon Mothma):** Rejection diagnosis + detailed redesign direction
2. **Orchestration entry (R2-D2):** Revision task initiation + implementation roadmap
3. **Session log:** Root cause analysis, strategic pivot rationale, implementation guidance, scaling philosophy
4. **Decision merge:** "Landing Page Redesign — MVP Reset" added to decisions.md with full context
5. **Cross-agent updates:** Mon Mothma and R2-D2 histories updated with rejection cycle context

**Key learning:** When designs are rejected, log not just the correction but the reasoning (premature scaling, tone mismatch, scope misalignment). This prevents the team from re-iterating on the same hypothesis.

**Decision inbox status:** Entries from Mon Mothma and R2-D2 merged into decisions.md; archived in inbox (inbox now empty).

---
