# GitHub Flow

Agency uses a lightweight GitHub-native publishing flow for squad manifests and the public site.

## 1. Submit a squad or site change

Open a pull request that adds or updates `squads/<slug>/squad.json` and/or the Astro site under `src/`.

Issue forms are available for discussion or listing requests, but publication happens through pull requests.

## 2. Validate the registry and site

`validate.yml` runs on pull requests and pushes to `main`.

It:

- installs Node dependencies
- validates every manifest against `tooling/schema/squad.schema.json`
- builds the generated `public/squads.json` feed and Astro Pages site
- runs the test suite

## 3. Review major UX changes locally

Before publishing any major UX change:

1. run `npm run dev` while iterating
2. run `npm run build`
3. run `npm run preview`
4. review the production output before merge

## 4. Deploy GitHub Pages

`deploy-pages.yml` runs on pushes to `main` and on manual dispatch.

It:

- rebuilds the registry feed and Astro static site
- uploads the `dist/` artifact for GitHub Pages
- deploys the site with GitHub Pages Actions

## 5. Optional upstream sync

`squad-upstream-sync.yml` remains available for scheduled or manual sync from an upstream repository if Agency later needs to mirror another source repo.

## Operating model

1. Add or update a squad manifest or site change in a branch.
2. Open a PR using the repository template.
3. Wait for validation to pass.
4. Review major UX changes with local preview before merge.
5. Merge to `main`.
6. Let GitHub Pages publish the updated directory.
