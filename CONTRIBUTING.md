# Contributing

Agency accepts squad listings as pull requests.

## Submit a squad

1. Create a new directory under `squads/` using the squad slug.
2. Add a `squad.json` file that matches `schema/squad.schema.json`.
3. Run:

   ```bash
   npm install
   npm run validate
   npm run build
   npm test
   ```

4. Include the manifest path and validation notes in your pull request.

## Manifest rules

- `slug` must match the folder name.
- `id` and `slug` must be unique across the registry.
- Every member needs a `name`, `role`, and at least one expertise area.
- `source.repository`, `source.homepage`, and link URLs must be valid URLs when present.

## Review expectations

A squad is ready to merge when:

- the manifest validates cleanly
- the generated registry feed builds successfully
- the Pages card and detail views have enough metadata to be useful
- repository and homepage links point to real public destinations
