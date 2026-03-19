# agency

Browse AI teams you can inspect, copy, and run in your own projects.

agency is the public directory for Bradygaster squads — published as `squad.json`, reviewed through pull requests, validated in CI, and rendered on GitHub Pages. It also exposes each published squad through a matching root-level directory so Squad plugin marketplace scanners can discover them directly from the repository root.

## Quickstart: install Bradygaster Squad

```bash
npm install -g @bradygaster/squad-cli
mkdir my-project && cd my-project
git init
squad init
```

After that, browse a listing in agency, open its source repository, and either copy/adapt the squad files or use `squad import <file>` when the source publishes an export snapshot.

## What ships in v1

- Canonical manifest layout at `squads/<slug>/squad.json`
- Root-level marketplace aliases at `<slug>/squad.json`, each reusing the canonical manifest
- JSON Schema validation for every submitted squad
- Generated `public/squads.json` feed for the Pages site
- Astro 5 + Tailwind CSS 4 static GitHub Pages directory for browsing registered squads
- Pull request validation and push-to-Pages deployment workflows

## Repository layout

```text
tooling/schema/          JSON Schema for squad.json
tooling/scripts/         validation and registry build scripts
tooling/tests/           automated test suites and test assets
squads/<slug>/squad.json published squad manifests
<slug>/squad.json        root-level marketplace alias for each published squad
src/                     Astro pages, components, and browser scripts
public/                  static assets copied into the Pages build (including squads.json)
```

## Using agency as a marketplace

Marketplace tools that scan the repository root can now discover squads at paths like `agency/squad.json` and `scout/squad.json`.

- `squads/<slug>/squad.json` remains the canonical manifest used by validation, feed generation, and the Astro site.
- `<slug>/squad.json` is the marketplace-facing alias that reuses the canonical manifest instead of duplicating it.

## Local development

```bash
npm install
npm run validate
npm run build
npm test
```

**Node version:** 20.0.0 or later

### Visual acceptance testing

For changes to the site design or layout, validate visual compliance with the Bradygaster Squad docs system:

```bash
# One-time setup (requires sudo)
bash tooling/scripts/setup-playwright.sh

# Then run visual tests anytime
npm run test:visual
```

**Prerequisites:** Visual testing requires system libraries for headless browser execution. The setup script will guide you through installation.

### Preview the production build locally

For major UX changes, preview the production output before publishing:

```bash
npm run build
npm run preview
```

Use `npm run dev` while iterating, then finish with `npm run build` + `npm run preview` to review what will ship.

## Adding a squad

1. Create `squads/<slug>/squad.json`.
2. Add a matching root-level marketplace alias at `<slug>/squad.json` that points to the canonical manifest.
3. Validate locally with `npm run validate`.
4. Rebuild the site with `npm run build`.
5. Open a pull request.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the submission checklist.

## Keeping squads in sync

This repository includes an [upstream sync workflow](./.github/workflows/squad-upstream-sync.yml) that periodically checks squad source repositories for updates. Squads can opt into automated sync by adding a `sync` configuration to their manifest.

See CONTRIBUTING.md for details on configuring upstream sync for your squad.
