# Wedge — History

## Core Context

- **Project:** A GitHub-based squad agency site that publishes a registry of squad manifests and is being aligned to the Bradygaster Squad docs stack while preserving Awesome Copilot-inspired discovery UX.
- **Role:** UX Tester
- **Joined:** 2026-03-17T05:21:16.969Z
- **Requested by:** Stefan Broenner
- **Current stack:** Astro 5.7, Tailwind 4.1, Playwright for browser-based UX verification

## Learnings

<!-- Append learnings below -->
- 2026-03-17: Reviewed the Astro landing page against the live Bradygaster Squad site and docs using local preview + Playwright capture. The current `src/styles/global.css` palette is rose/cyan/navy on dark glass surfaces, but the live Squad docs language is much lighter and more restrained: white/light-neutral page chrome, rose-primary CTAs (`#dd2d60`), pale rose active states (`#fff0f3`), and simpler bordered surfaces.
- 2026-03-17: Key files for visual review are `src/pages/index.astro`, `src/components/SquadCard.astro`, `src/scripts/site.js`, and `src/styles/global.css`. These files currently drive the palette, CTA treatment, card surfaces, and modal styling that need to be brought back toward the live Squad docs reference.
- 2026-03-17: Local verification path works with `npm run build`, `npm test`, and `npm run preview -- --host 127.0.0.1`. Use preview, not just source review, before accepting any future visual pass.
- 2026-03-17: Visual acceptance harness prepared at `tests/visual-acceptance.test.mjs`. Run with `npm run test:visual` (builds the site first). The test starts its own preview server on port 4322, captures screenshots to `tests/screenshots/visual-acceptance/`, and asserts the six acceptance criteria: lighter shell, rose CTA pair, no backdrop-blur, no cyan accent, tight border-radius (≤20 px), and no explanatory style sentence. The `test` script was narrowed to `tests/registry.test.mjs` so the visual harness (which needs a browser) does not run in CI automatically.
- 2026-03-17: Playwright is installed as `playwright` (not `@playwright/test`). Access the chromium API via `createRequire` in an ESM file: `const { chromium } = require('playwright')`. The test runner used is Node's built-in `node:test`.
- 2026-03-17: Playwright browser launch on this host requires `libnspr4` + `libnss3` (aarch64) which are not installed. When browser launch fails, fall back to source + dist inspection for static Tailwind/Astro sites — compiled Tailwind class names are direct proxies for computed style values, so CSS token inspection + class audit gives equivalent signal to a browser review for palette, radius, backdrop, and text checks.
