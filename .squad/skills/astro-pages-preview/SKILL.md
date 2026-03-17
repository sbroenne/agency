---
name: "astro-pages-preview"
description: "How to migrate a static registry to Astro + Tailwind on GitHub Pages without losing preview discipline"
domain: "deployment"
confidence: "high"
source: "earned"
tools:
  - name: "bash"
    description: "Install Astro/Tailwind, run builds, and smoke-test dev/preview servers"
    when: "Use when validating the local and CI workflow end to end"
---

## Context
Use this when a hand-rolled static site needs to match an Astro-based docs stack while keeping an existing generated JSON/data pipeline intact.

## Patterns
### Keep the data pipeline, swap the rendering layer
Leave validation and registry generation in place, continue emitting a public JSON artifact, and move the browser-facing UI into `src/` Astro pages/components.

### Build the same artifact you deploy
For GitHub Pages, build Astro to `dist/` and upload that artifact in Actions instead of publishing the source `public/` directory directly.

### Gate major UX work with production preview
Use `npm run dev` for iteration, but require `npm run build` followed by `npm run preview` before publishing any major UX change.

## Examples
- `package.json`: `dev -> astro dev`, `build -> astro build`, `preview -> astro preview`, with a registry pre-build step.
- `.github/workflows/deploy-pages.yml`: build the Astro site and upload `dist/`.
- `public/squads.json`: keep the generated feed available for clients and smoke tests.

## Anti-Patterns
- **Publishing `public/` directly after framework migration** — this bypasses the built Astro output.
- **Treating hot reload as sufficient preview** — it does not guarantee the shipped artifact is what reviewers saw.
- **Rewriting the data flow during the platform migration** — changing rendering and data generation at the same time adds unnecessary risk.
