# Padme History

## Project Context

- Project: `agency`
- Requested by: Stefan Broenner
- Current stack: Astro + Tailwind CSS
- Visual references: `https://awesome-copilot.github.com/` for IA/discovery patterns and Bradygaster Squad docs for visual style
- Active UX constraint: local preview is mandatory before any major UX publish

## Learnings

- Joined to own lockout-safe visual revisions after Wedge rejected the current docs-style pass.
- Wedge's acceptance bar requires a lighter docs-style shell, rose-led CTA hierarchy, calmer bordered surfaces, restrained accent usage, and a true hero CTA pair.
- Implemented the light docs-style visual revision addressing all Wedge rejection points:
  - Shifted from dark navy/black composition to white (#ffffff) page chrome with light neutral surfaces
  - Made rose (#dd2d60 / squad-600) the single dominant accent color
  - Removed cyan and navy as competing accents (deleted color-accent and color-navy from theme)
  - Replaced heavy glassmorphism with flat bordered surfaces using subtle 200-level borders
  - Reduced corner radius from 28–32px down to 6–12px (rounded-lg system)
  - Added explicit hero CTA pair: solid rose primary + neutral bordered secondary
  - Removed the self-referential style description sentence
  - Normalized all resource cards to consistent neutral styling
- Key file paths for visual system: `src/styles/global.css`, `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/scripts/site.js`
- Build validation: `npm run build && npm run preview` confirms HTTP 200 on `/agency/`
- Implemented two-tier filter UI system per IA decisions:
  - Tier 1: Status chips (All/Live/Building/Prototype) always visible with facet counts
  - Tier 2: Focus filters collapsed by default, shows count, expandable with inline search and progressive disclosure (top 7 visible, "Show all" expander for rest)
  - Multi-select focus filtering with AND logic (cards must match ALL selected focuses)
  - Clear filters control appears when filters are active
  - All filter chips use consistent docs-style treatment: bordered surfaces, rose/green active states via data-[active] selectors
  - SquadCard now emits data-status and data-focus attributes for client-side filtering
  - Created `tests/filter-ui.test.mjs` with 15 structure tests that pass without Playwright
- Confirmed discovery-first hierarchy preserved: Directory section before Resources section
- Rebranded landing page from "Awesome Squads" to "agency" (project name):
  - Page title updated to `agency`
  - Hero badge updated to `agency`
  - Hero headline changed from generic "Community-contributed squads for GitHub Copilot" to benefit-focused "AI teams that work inside your codebase"
  - Sub-headline refined to emphasize discovery and adaptability: "Discover squads — reusable Copilot team configurations you can inspect, copy, and adapt for your projects."
  - Meta description updated for SEO alignment

## Headline Revision Rejection — 2026-03-19

**Task:** Wedge's review of "Your codebase, staffed by AI" headline

**Verdict:** ❌ REJECTED

**Reasons:**
1. **Fails discovery-first positioning** — Leads with ownership/outcome ("Your codebase") not discovery. Supporting sentence has to do all positioning work (backwards).
2. **Borderline misleading** — "Staffed by AI" implies ongoing active staffing service. Reality: site helps you *find* and *copy* squads (discovery + portability).
3. **Violates copy principle** — Team explicitly states: "Lead with discovery language ('Browse', 'Discover') not installation"

**Strengths noted:**
- Catchier than predecessor
- Comma structure creates satisfying beat
- "Staffed" plays cleverly on product name "agency"

**Requirement:** Different agent (Mon Mothma) to revise under rejection criteria:
1. Lead with/strongly imply discovery
2. Communicate this is a catalog, not deployment service
3. Stay punchy (~6 words or fewer)
4. Truth-check: only promise deliverables

**Resolution:** Mon Mothma revised to "Find your next squad"; Wedge approved
