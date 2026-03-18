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
