---
name: "docs-stack-alignment"
description: "How to assess and align a site with an upstream docs stack while keeping preview discipline"
domain: "architecture"
confidence: "high"
source: "observed"
tools:
  - name: "github-mcp-server-get_file_contents"
    description: "Inspect upstream package, config, and workflow files directly"
    when: "Use when the reference implementation lives in GitHub and exact stack details matter"
  - name: "web_fetch"
    description: "Confirm how the published site behaves from the outside"
    when: "Use after repo inspection to verify the public surface matches the inferred stack"
---

## Context

Use this skill when a repo must match an upstream docs or marketing site stack, especially if the team wants both platform consistency and a reliable preview-before-publish workflow.

## Patterns

### Inspect the upstream in three layers

Check:
1. the published site,
2. the upstream docs package/config,
3. the upstream deployment workflow.

That combination tells you the real stack, not just the claimed stack.

### Separate core stack from optional add-ons

Treat the generator, styling system, and preview workflow as the core platform. Treat search indexing or analytics as optional unless the product need is already present.

### Preview must use production output

For UX gating, require `build` plus `preview`, not only a hot-reload dev server. The goal is to review what will actually ship.

### Translate the upstream visual system into explicit local tokens

If the ask is visual alignment, extract the upstream brand palette and surface neutrals into local theme tokens first. Then re-map local cards, badges, buttons, and overlays to those tokens instead of hand-tuning one-off colors; this keeps the whole site coherent and makes future review faster.

### Add a visual acceptance gate when design drift is the recurring failure

If styling keeps getting rejected for not matching the upstream docs, codify that expectation in contribution guidance. A short rule tying preview review to visual alignment prevents future passes from drifting back to ad-hoc colors.

### Preserve behavior before enhancing architecture

When migrating from a hand-rolled static site to a framework stack, port the current experience first, then add new UX improvements. Migration and redesign together create unnecessary risk.

## Examples

- Official stack found in `bradygaster/squad/docs/package.json`: Astro 5.7, Tailwind 4.1, `dev`, `build`, `preview`
- Official deployment found in `bradygaster/squad/.github/workflows/squad-docs.yml`: build docs and deploy static output to GitHub Pages
- Current `agency` mismatch found in root `package.json`, `public/index.html`, and `.github/workflows/deploy-pages.yml`
- Current `agency` visual alignment pass: `src/styles/global.css` defines the upstream Squad palette locally and `CONTRIBUTING.md` requires a docs-alignment check for major UX changes.

## Anti-Patterns

- **Assuming visual similarity means stack similarity** — matching colors and layout is not the same as matching the underlying platform.
- **Fixing visual mismatch one component at a time** — isolated color tweaks drift quickly; start by aligning shared palette and surface tokens.
- **Mandating dev-server review only** — UX checks done only in live-reload mode miss production-output issues.
- **Pulling in every upstream dependency by default** — optional search/indexing features should follow actual product need.
