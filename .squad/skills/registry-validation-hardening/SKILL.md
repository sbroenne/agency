---
name: "registry-validation-hardening"
description: "How to harden manifest validation and test a generated registry without mutating the live squads tree"
domain: "testing"
confidence: "high"
source: "earned"
tools:
  - name: "node:test"
    description: "Run deterministic schema and registry tests with temporary repo fixtures"
    when: "Use when validation logic depends on on-disk schema and manifest discovery"
  - name: "ajv"
    description: "Keep structural JSON Schema checks strict, then layer semantic validation in code"
    when: "Use when some assumptions are difficult or noisy to express in schema alone"
---

## Context
Use this when a repo discovers manifests from disk, validates them with JSON Schema, and then derives a normalized registry artifact.

## Patterns
### Make registry loaders injectable
Allow the registry loader to accept `repoRoot`, `schemaPath`, `squadsRoot`, and an optional clock so tests can point at a temp workspace and assert stable output.

### Split structural and semantic validation
Keep JSON Schema responsible for shape, enums, and basic formats; add focused semantic checks in code for assumptions like repo-relative paths or repository URL path depth.

### Test failures with temp repos, not the real tree
Create a temporary repo skeleton containing `schema/` and `squads/`, write only the manifests needed for each case, and clean it up with the test harness.

## Examples
- `loadRegistry({ repoRoot, schemaPath, squadsRoot, now })` for deterministic tests.
- JSON Schema conditional: require `path` and `ref` when import type is `upstream-sync` or `fork-sync`.
- Negative cases: invalid JSON, duplicate ids/slugs, slug-directory mismatch, relative-path escapes, malformed repository URLs.

## Anti-Patterns
- **Testing validation by editing the real `squads/` tree** — this couples tests to workspace state and creates cleanup risk.
- **Relying on `format: "uri"` alone for repository semantics** — it accepts URLs that still break registry assumptions.
