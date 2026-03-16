# GitHub Flow

Agency uses a lightweight GitHub-native publishing flow for squad manifests.

## 1. Submit a squad

Open a pull request that adds or updates `squads/<slug>/squad.json`.

Issue forms are available for discussion or listing requests, but publication happens through pull requests.

## 2. Validate the registry

`validate.yml` runs on pull requests and pushes to `main`.

It:

- installs Node dependencies
- validates every manifest against `schema/squad.schema.json`
- builds the generated `public/squads.json` feed
- runs the test suite

## 3. Deploy GitHub Pages

`deploy-pages.yml` runs on pushes to `main` and on manual dispatch.

It:

- rebuilds the registry feed
- uploads the `public/` directory as a Pages artifact
- deploys the site with GitHub Pages Actions

## 4. Optional upstream sync

`squad-upstream-sync.yml` remains available for scheduled or manual sync from an upstream repository if Agency later needs to mirror another source repo.

## Operating model

1. Add or update a squad manifest in a branch.
2. Open a PR using the repository template.
3. Wait for validation to pass.
4. Merge to `main`.
5. Let GitHub Pages publish the updated directory.
