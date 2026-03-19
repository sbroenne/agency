---
name: "squad-source-deeplinks"
description: "How to choose squad card destinations when multiple squads live in one repository"
domain: "ux"
confidence: "high"
source: "observed"
---

## Context

Use this when a squad marketplace or directory renders cards from manifest data and more than one squad can come from the same GitHub repository.

## Patterns

### Do not assume `source.repository` is squad-specific

`source.repository` identifies the hosting repo, not necessarily the exact squad location. In a monorepo, multiple cards can legitimately share the same repository URL.

### Build human-facing View links from the most specific existing path field

Prefer a deep link built from repository + ref + relative squad path:
- use `source.directory` for a browsable folder destination
- use `source.manifestPath` or `source.import.path` when the exact manifest file is the right target

### Keep trust links distinct from destination links

If the UI already exposes a repository/homepage link elsewhere, the primary card CTA should point to the squad itself, not repeat the generic repo root.

## Example

For a manifest with:
- `source.repository = https://github.com/org/repo`
- `source.import.ref = main`
- `source.directory = squads/scout`

A good card destination is:
`https://github.com/org/repo/tree/main/squads/scout`

## Anti-Patterns

- Sending every squad card in a monorepo to the same repo homepage
- Reusing a site-wide homepage URL as a squad-specific destination
- Assuming missing per-squad URLs require manifest changes when relative path data already exists
