# R2-D2 — History

## Core Context

- **Project:** A GitHub-based squad agency where new squads are submitted via pull requests, stored as `squad.json`, and published through GitHub Pages using an Awesome GitHub Copilot-style template.
- **Role:** Platform Engineer
- **Joined:** 2026-03-16T18:01:28.017Z

## Learnings

### Simplified Landing Replacement (2026-03-16)

**Replacement shipped cleanly in the existing static stack.**

Key findings:
- **CTA-first beats directory-first at this scale:** with only one published squad, leading with quickstart and submission actions is clearer than leading with browse mechanics.
- **One lightweight search is enough:** removing filters, multi-state selection, and detail-pane orchestration preserves usefulness without turning the page into an app.
- **Subdued Bradygaster influence works better:** dark gradients, restrained accents, and clean cards keep the Bradygaster vibe without heavy glass, floating chrome, or motion noise.

### Reference Alignment Correction (2026-03-16)

**Corrected the landing page to follow Awesome Copilot for structure and Bradygaster Squad for presentation.**

Key findings:
- **Primary IA must stay discovery-first:** hero search and browse grid belong above support content when Awesome Copilot is the main reference.
- **Support content should stay lightweight:** contribution and getting-started guidance work best as secondary cards, not as the opening flow.
- **Reference fidelity improved by subtraction:** a single hero search and simple card grid are closer to the reference pair than either quickstart-first copy or custom filter mechanics.

### Landing Page Redo Prep (2026-03-16)

**Prep complete for calmer replacement direction.**

Key findings:
- **Highest-risk complexity to remove first:** the app-like browse experience is oversized for the current content set (1 squad) — dual search inputs, collapsible focus filtering, sticky detail pane, copy-link state, and heavy motion/glass styling create more interface than information.
- **Primary simplification target:** collapse the two-panel JS-driven directory/detail interaction into a calmer, single reading flow with fewer competing controls.
- **Visual debt is concentrated in CSS:** animated background orbs, layered translucency, dense panel chrome, and many bordered containers amplify the sense of noise before content proves value.
- **Implementation readiness:** existing static stack is sufficient; no platform blocker for a simpler replacement in `public/`.
- **Baseline is healthy:** tests pass and build succeeds, so revision work can focus on UX simplification rather than pipeline repair.

### Stack Fit Analysis (2026-03-16)

**Bradygaster Astro 5.7 + Tailwind 4.1 + Pagefind assessment completed.**

Key findings:
- **Astro is feasible:** Static build model identical to current Pages deployment; zero friction on deploy.
- **Tailwind worth adopting:** ~70% CSS reduction, dark mode built-in, low migration cost.
- **Pagefind premature:** Only 1 viewport of data today; search scales poorly for discovery UX until catalog grows to 20+.
- **Skip content collections for now:** You're data-driven (squads.json), not prose-driven. Collections valuable when you own narrative docs later.
- **Recommendation:** Partial adoption—Astro + Tailwind. Defer Pagefind until catalog growth validates search need.
- **Timeline:** Post-Phase 1 of IA reorder, not blocking.

Mitigations documented in inbox decision record.

### Landing Page Redesign Rejection & Revision Cycle (2026-03-16)

**Status:** Revision assigned to R2-D2  
**Context:** User rejected approved redesign as over-engineered for premature scale (50+ squad spec deployed with 1 squad).

**Analysis provided by Mon Mothma:**
- Root cause: Specification assumed filter complexity was bottleneck; actual bottleneck is contributions
- Scale mismatch: Built for future catalog, not current reality
- Impact: Complex UI (multi-select filters, facet counts, collapsible drawer) feels like bloatware with only 1 squad visible
- Tone mismatch: Emphasized discovery when early-stage needs submission clarity

**Direction:** MVP simplification—remove interaction complexity first, reorder for contribution-first UX, tone down visuals. Build for today (1 squad); add filtering when catalog growth justifies it.

**Revision approach aligned with R2-D2's earlier learning:**
- Remove interaction complexity before visual polish ✓
- Collapse two-column browser into single-column narrative flow ✓
- Keep at most one primary discovery control ✓
- Simplify from layered visual treatment to quieter base ✓

**Assigned work:**
- HTML restructure: Remove filter drawer, stats, callouts (move Quickstart above Directory)
- JS simplification: Remove focus state mgmt, facet logic, progressive tag disclosure
- CSS cleanup: Reduce from ~900 to ~400 lines; remove animations, callout chrome
- Test + deploy

**Estimate:** 4-5 hours complete reset

**Artifacts:**
- `.squad/orchestration-log/2026-03-16T20:45:00Z-mon-mothma.md` — Rejection analysis + detailed direction
- `.squad/orchestration-log/2026-03-16T20:45:30Z-r2-d2.md` — This revision sprint initiation
- `.squad/log/2026-03-16T20:45:00Z-redesign-rejection-pivot.md` — Session context & scaling philosophy
- `.squad/decisions.md` — New decision merged: "Landing Page Redesign — MVP Reset"

**Key insight:** Premature scaling (over-engineering for problems that don't exist yet) defers value. Iterate with real catalog growth; solve problems as they emerge.

### Landing Page Redesign Implementation Status (2026-03-16)

**Status:** Completed  
**Owner:** Poe (UX Engineer)

Landing redesign implemented in existing static stack with discovery-first hierarchy, multi-select searchable focus filter with facet counts, Bradygaster visual polish (glassmorphic panels, subtle animations, dark theme), and collapsed quickstart below fold. Validation passed.

**Key alignment:** IA recommendation now live; IA Phase 1 complete. Astro + Tailwind adoption (your recommendation) ready for post-implementation prioritization.

**Artifacts:**
- `.squad/orchestration-log/2026-03-16T19:20:29Z-poe.md` — Orchestration log
- `.squad/decisions.md` — Merged decision record

### Awesome Copilot + Bradygaster landing alignment (2026-03-16)

**Landing rebuilt to mirror Awesome Copilot structure with Bradygaster-inspired calm styling.**

Key findings:
- **Discovery-first IA:** hero + nav lead directly into the directory, with browsing as the primary action.
- **Simplified interaction:** single search input and clean card grid replace heavier directory mechanics.
- **Contribution call-to-action:** dedicated section keeps submission path clear without leading with install steps.

### Awesome Copilot + Bradygaster Landing Redo (2026-03-16)

**Reference-led rebuild shipped in the existing static stack.**

Key findings:
- **Awesome Copilot structure translates cleanly to this registry:** hero → search → browse cards gives clearer orientation than a quickstart-led or app-like layout.
- **Bradygaster works best as visual language, not layout complexity:** dark gradients, strong headline scale, pill CTAs, and calm panels deliver the feel without recreating docs-site sprawl.
- **Minimal JS is enough for Pages here:** live search plus optional hash highlighting preserves discoverability while avoiding state-heavy directory mechanics.

### Astro + Tailwind Pages Migration (2026-03-17)

**Astro 5.7 + Tailwind 4.1 now power the public registry with mandatory local preview for major UX work.**

Key findings:
- **Stack alignment should preserve the registry pipeline:** `scripts/build-registry.mjs` still generates `public/squads.json`, while Astro reads the same registry source for static page generation.
- **Preview discipline is now part of the platform contract:** `npm run dev` supports iteration, but major UX work must finish with `npm run build` and `npm run preview` before publish.
- **Pages deployment is cleaner from `dist/`:** GitHub Actions now builds the Astro site and uploads the static artifact instead of publishing `public/` directly.
- **Key paths:** `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/scripts/site.js`, `astro.config.mjs`, `.github/workflows/deploy-pages.yml`.
