# Forge Skill Distribution Registry

Registry of skill distributions created and tracked by the Forge system. Each entry shows distribution name, type, version, status, and publishing details.

This registry tracks reusable skill distributions—packages of agent skills with optional custom agents and prompts—for the squad ecosystem.

**Last Updated:** 2026-03-19

## Library Distributions

Library distributions are **skills-only** packages — reusable utilities with no custom agents or prompts. These are stateless collections of agent skills and MCP tools designed for integration into multiple workflows.

| Distribution Name | Status | Version | Maintainer | Published | Notes |
|---|---|---|---|---|---|
| `excel-mcp-server` | stable | 1.0.0 | Excel Skill Team | [excelmcpserver.dev](https://excelmcpserver.dev) | Windows Excel automation (agent skills: file ops, Power Query, DAX, formatting) |

### `excel-mcp-server`

- **Type:** Library distribution
- **Published npm:** `@bradygaster/excel-mcp-server`
- **Repository:** [https://github.com/bradygaster/excel-mcp-server](https://github.com/bradygaster/excel-mcp-server)
- **Agent Skills:** Excel file operations, workbook/sheet management, Power Query, DAX formulas, PivotTables, formatting, VBA
- **Architecture:** Standalone MCP server, no APM required
- **Stable:** Yes — production-ready for Windows environments
- **Last Release:** 2026-03-19 (v1.0.0)

## Customer-Facing Distributions

Customer-facing distributions are **complete workflow packages** with agent skills, custom agents, and system prompts. These are specialized assistants designed for specific user-facing use cases.

*None published yet. First customer-facing distribution expected: Q2 2026.*

## Planning / In Development

Distributions currently under development or in planning phase:

*None at this time.*

## Deprecated Distributions

*None at this time.*

---

## How to Add a Skill Distribution

1. Develop your distribution in a dev repo with the directory structure defined in [`docs/FORGE.md`](../../docs/FORGE.md).
2. Validate locally using the distribution validation script: `npm run validate:plugins` (if present in dev repo).
3. Publish your distribution to npm (for library distributions) or GitHub Pages/static hosting (for customer-facing distributions).
4. Submit a pull request to this repository updating `squads/forge/PLUGINS.md` with your distribution entry, following the format above.
5. Include your distribution's:
    - Type (library or customer-facing)
    - Current status (dev, beta, stable, deprecated)
    - Published location (npm package name, GitHub repo, or docs site)
    - Brief description of agent skills, custom agents, and prompts included

See [`docs/FORGE_SETUP.md`](../../docs/FORGE_SETUP.md) for a complete step-by-step walkthrough using Excel MCP Server as the reference distribution.

## Status Definitions

- **dev** — Under active development; not ready for production use
- **beta** — Published but undergoing active refinement; feedback welcome
- **stable** — Production-ready; actively maintained
- **deprecated** — No longer recommended; consider using alternative plugin

## Publishing Guidelines

### Library Distribution Workflow

1. **Develop** in dev repo under `skills/<skill-id>/` (agent skills only)
2. **Build** using your dev repo's build script (emit `plugin.json` and skills/)
3. **Publish** to npm as `@organization/distribution-name`
4. **Register** in `PLUGINS.md` with npm package URL and version
5. **Document** agent skills in your published distribution's README

### Customer-Facing Distribution Workflow

1. **Develop** in dev repo under `skills/<skill-id>/`, `agents/`, and `prompts/`
2. **Build** complete workflow (agent skills + custom agents + prompts)
3. **Publish** to npm or GitHub Pages as complete distribution package
4. **Register** in `PLUGINS.md` with repository/docs URL
5. **Document** custom agents, prompts, example workflows, and integration guide
