# Awesome Squads

Awesome Squads is the agency for Bradygaster squads.

Squads are published as `squad.json`, reviewed through pull requests, validated in CI, and rendered as a public directory on GitHub Pages.

## Quickstart: install Bradygaster Squad

```bash
npm install -g @bradygaster/squad-cli
mkdir my-project && cd my-project
git init
squad init
```

After that, browse a listing in Awesome Squads, open its source repository, and either copy/adapt the squad files or use `squad import <file>` when the source publishes an export snapshot.

## What ships in v1

- Canonical manifest layout at `squads/<slug>/squad.json`
- JSON Schema validation for every submitted squad
- Generated `public/squads.json` feed for the Pages site
- Static GitHub Pages directory for browsing registered squads
- Pull request validation and push-to-Pages deployment workflows

## Repository layout

```text
schema/                  JSON Schema for squad.json
scripts/                 validation and build scripts
squads/<slug>/squad.json published squad manifests
public/                  GitHub Pages site
```

## Local development

```bash
npm install
npm run validate
npm run build
npm test
```

## Adding a squad

1. Create `squads/<slug>/squad.json`.
2. Validate locally with `npm run validate`.
3. Rebuild the Pages feed with `npm run build`.
4. Open a pull request.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the submission checklist.
