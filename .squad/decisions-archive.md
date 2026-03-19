# Squad Decisions Archive

> Archived foundational and historical decisions. See `decisions.md` for active, working decisions.

---

## Archived Decisions (2026-03-16 to 2026-03-19)

### Landing Page Information Architecture (ARCHIVED — Superseded by implementation)

**Owner:** Mon Mothma (Lead) + Poe (UX Engineer)  
**Date:** 2026-03-16  
**Status:** Superseded  

#### Context

This decision outlined the architectural vision for a scalable, discovery-first landing page with two-tier filters. It was sound architecturally but temporally premature at creation. The team later simplified the MVP to match current catalog scale (1-5 squads) and implemented Tier 1 (status chips) + Tier 2 (collapsible focus filters) in the current sprint.

#### Original Recommendation

Three moves:
1. Reorder content: Discovery first (Directory above Quickstart)
2. Smart filter UI: Search-first + Progressive disclosure (5-7 most-used focus areas visible; "Show all filters" expander)
3. Progressive tag disclosure: Reduce cognitive load (1-2 tags on cards; grouped detail view)

#### Why It's Archived

The concepts are now implemented (Tier 1 + Tier 2 filters, discovery-first IA). This record is preserved for historical context and future reference if catalog scale requires Phase 2 enhancements (category browsing, advanced faceted search).

#### Related Active Decisions

- **Filter UI Implementation — Sprint Completion** — Implemented version of this spec
- **Public Pages Squad Browser** — Current baseline
- **Landing Page Redesign & Platform Rebuild** — Execution baseline

---

### Public Pages Squad Browser (ARCHIVED — Superseded by Visual Pass revision)

**Owner:** R2-D2 (Platform Engineer)  
**Date:** 2026-03-16  
**Status:** Superseded by light docs-style redesign  

#### Context

Initial rebuild decision using Awesome Copilot as UX reference and Bradygaster Squad as visual reference. The rebuild was executed but then visually revised by Padme and approved by Wedge. Current baseline is the light docs-style version (2026-03-18+).

#### Related Active Decisions

- **Visual Pass: Light Docs-Style Redesign** — Current approved visual baseline
- **Landing Page Redesign & Platform Rebuild** — Original rebuild execution record

---

### GitHub Flow Design (ARCHIVED — Implemented and stable)

**Owner:** Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Implemented and stable  

#### Context

Updated GitHub workflow and PR template to support Astro build artifact output and preview requirement. This is now part of standard team practice and no longer needs active governance.

---

### Bradygaster Squad Style Alignment (ARCHIVED — Implemented and stable)

**Owner:** Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Implemented and stable  

#### Context

Foundational decision to adopt Bradygaster Squad visual language (palette, components, typography, motion) as the design system. This is now the team standard and part of all UX work. Archived as "implemented and stable."

#### Related Active Decisions

- **Visual Pass: Light Docs-Style Redesign** — Current visual reference
- **Bradygaster Squad Style Alignment** — Active context (kept in main decisions.md)

---

### Tech Stack Alignment & Local Preview Mandate (ARCHIVED — Active as standing directive)

**Owner:** Stefan Broenner (User)  
**Date:** 2026-03-17  
**Status:** Active directive (kept in main decisions.md)  

#### Context

Foundational directive requiring Astro 5.7 + Tailwind 4.1 alignment and mandatory local preview before publication. This is now a standing team practice and is referenced in all UX work. Kept in active decisions.md for continuous governance.

---

### Model Override: GPT-5.4 for Landing Page Rebuild (ARCHIVED — Task-specific, completed)

**Owner:** Stefan Broenner (User)  
**Date:** 2026-03-16  
**Status:** Completed task override  

#### Context

One-time model override for the landing page rebuild task. Completed successfully. Archived as task-specific decision.

---

### Landing Page Redesign & Platform Rebuild (ARCHIVED — Execution record, superseded by visual revision)

**Owner:** R2-D2 (Platform Engineer) + Mon Mothma (Lead)  
**Date:** 2026-03-16  
**Status:** Completed, superseded by light docs-style revision  

#### Context

Initial rebuild execution record. The rebuild was successful but visually revised in the next sprint. Kept for historical context; see **Visual Pass: Light Docs-Style Redesign** for current baseline.

---

### Design Leadership: Poe on Landing Page (ARCHIVED — Active ownership, kept in main decisions.md)

**Owner:** Poe (UX Expert)  
**Date:** 2026-03-16  
**Status:** Active ownership  

#### Context

Poe assumed design leadership for landing page visual refinement. This is an active, ongoing role. Kept in main decisions.md for team reference.

---

### Visual Pass: Light Docs-Style Redesign (ACTIVE — See main decisions.md)

**Status:** Currently active; see main decisions.md

---

### Wedge Visual Acceptance Harness (ARCHIVED — Implemented and now part of team practice)

**Owner:** Wedge (UX Tester)  
**Date:** 2026-03-18  
**Status:** Implemented and active  

#### Context

Playwright-based visual acceptance test harness encoding six acceptance criteria. This is now part of standard team testing practice. Kept in main decisions.md as reference for visual review process.

---

### Wedge UX Tester — Squad Roster Addition (ACTIVE — See main decisions.md)

**Status:** Currently active; see main decisions.md

---

**Archive created:** 2026-03-19T06:07:32Z  
**Archiver:** Scribe  
**Reason:** decisions.md exceeded ~20KB threshold; archived foundational and stable decisions while preserving active governance records in main file.
