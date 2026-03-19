# Contributing

Agency accepts squad listings as pull requests.

## Paths to contribute

### Submit a squad

1. Create a new directory under `squads/` using the squad slug.
2. Add a `squad.json` file that matches `tooling/schema/squad.schema.json`.
3. Run:

   ```bash
   npm install
   npm run validate
   npm run build
   npm test
   ```

4. Include the manifest path and validation notes in your pull request.

### Contribute to the site or documentation

Bug fixes, documentation updates, and site improvements are welcome:

1. Create a branch and make your changes to site code (`src/`), tooling (`tooling/tests/`, `tooling/schema/`, `tooling/scripts/`), or documentation files.
2. Run `npm run build` and `npm test` locally to verify no regressions.
3. For any visual changes, run `npm run build` + `npm run preview` and confirm alignment with the Bradygaster Squad docs visual system.
4. Open a pull request with a clear description of the change and its rationale.

## Major UX changes

A **major UX change** includes: layout modifications to cards or detail views, changes to site-wide styling (Tailwind config, colors, typography), reorganization of navigation, or any changes to the visual rendering of squads in the directory. Changes to squad metadata or adding new squads do not require visual review.

When proposing a major UX change:

1. Use `npm run dev` while iterating.
2. Run `npm run build`.
3. Run `npm run preview` and review the production output locally before opening or merging the PR.
4. Confirm the shipped visuals still align with the Bradygaster Squad docs language: white/light-neutral shell, rose-led primary accents, calm bordered surfaces, and tighter radii.
5. Note the preview review and visual alignment check in the pull request.

When adding or updating squads, visual review is not required unless you are also changing site styling.

## Manifest rules

- `slug` must match the folder name.
- `id` and `slug` must be unique across the registry.
- Every member needs a `name`, `role`, and at least one expertise area.
- `source.repository`, `source.homepage`, and link URLs must be valid URLs when present.

## Review expectations

A squad is ready to merge when:

- the manifest validates cleanly
- the Astro site builds successfully
- major UX changes have been reviewed with `npm run build` + `npm run preview`
- major visual changes still match the Squad docs tone and color system
- the Pages card and detail views have enough metadata to be useful
- repository and homepage links point to real public destinations

### Visual testing

Run the visual acceptance test suite before publishing site changes:

```bash
npm run test:visual
```

This validates the Bradygaster Squad docs visual system compliance (colors, spacing, typography, component rendering).

#### Prerequisites for visual testing

The visual acceptance tests require Playwright and system libraries for headless browser execution. Before running `npm run test:visual` for the first time, install the required system dependencies:

**First time setup (one-time):**
```bash
bash tooling/scripts/setup-playwright.sh
```

This script installs the necessary system libraries (libnspr4, libnss3, libasound2, etc.) and requires `sudo` access. You will be prompted for your password.

**After setup:** Visual tests will run normally with `npm run test:visual`.

## Upstream sync configuration

Squads can opt into automated sync by adding a `sync` property to their manifest:

```json
{
  "slug": "my-squad",
  "sync": {
    "repository": "https://github.com/owner/squad-repo",
    "path": "squad.json"
  }
}
```

The Agency's [squad-upstream-sync workflow](./.github/workflows/squad-upstream-sync.yml) runs periodically and checks configured repositories for updates. When changes are detected, a pull request is created to merge upstream updates into the Agency registry.
