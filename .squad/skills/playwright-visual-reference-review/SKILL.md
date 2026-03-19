---
name: "playwright-visual-reference-review"
description: "How to validate the agency UI against the live Squad docs visual language using local preview and Playwright capture"
domain: "testing"
confidence: "high"
source: "earned"
tools:
  - name: "bash"
    description: "Build the site, run preview, and execute Playwright capture scripts"
    when: "Use when validating the shipped UI instead of raw source only"
---

## Context
Use this when a landing page or UI pass claims alignment with Bradygaster Squad and you need to verify the real rendered experience, not just class names in source.

## Patterns
### Preview the built artifact first
Run the production flow (`npm run build`, then `npm run preview`) before reviewing visuals. This catches drift between source assumptions and the rendered output.

### Compare against the live reference, not memory
Capture the local page and the live Bradygaster Squad site/docs in the same review pass. Treat the current live docs as the visual source of truth when previous internal notes conflict.

### Review six things explicitly
Check palette, contrast tone, accent discipline, surface treatment, spacing tone, and CTA hierarchy. Those six categories are enough to produce a crisp accept/reject note without drifting into vague design language.

### Extend review to interaction quality and IA completeness
After clearing the six visual checks, audit: (1) keyboard / ARIA patterns on interactive components (cards, modals, search); (2) IA conformance against the agreed decisions spec — is the filter UI built? does the page order match the signed-off flow?; (3) missing infrastructure meta (OG tags, favicon). Visual pass alone does not equal UX pass.

### Write corrections as visual instructions
Reject with specific changes: exact accent to promote, accents to remove, surface treatment to flatten, spacing to open up, and CTA pattern to adopt.

## Examples
- Local files to inspect: `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/styles/global.css`, `src/scripts/site.js`
- Reference surfaces: `https://bradygaster.github.io/squad/` and `https://bradygaster.github.io/squad/docs/get-started/installation/`

## Anti-Patterns
- **Reviewing source only** — visual mismatches often appear only after Tailwind/theme compilation.
- **Using stale internal decisions as the sole reference** — live docs may have moved on.
- **Calling a page “aligned” because one color token matches** — the overall tone, spacing, and CTA hierarchy matter just as much.
- **Blocking on browser launch failure** — when Playwright can't open a browser (e.g. missing `libnspr4`/`libnss3` on the host), fall back to source + `dist/` inspection for Tailwind/Astro sites. Compiled class names are direct proxies for computed styles; a class audit gives equivalent signal for palette, radius, backdrop-filter, and text content checks. Always document the browser failure and note the fix (`sudo apt-get install libnspr4 libnss3 libasound2t64`).
