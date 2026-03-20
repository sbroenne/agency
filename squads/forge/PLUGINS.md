# Forge Plugin Registry

Registry of Forge plugins created and tracked by the Forge system. Each entry shows plugin name, type, version, status, and publishing details.

This registry tracks **Forge plugins**. It does not track VS Code extensions or GitHub CLI extensions.

**Last Updated:** 2026-03-19

## Library Plugins

Library plugins are **skills-only** packages — reusable utilities with no agents or UI. These are stateless collections of MCP tools and skills designed for integration into multiple workflows.

| Plugin Name | Status | Version | Maintainer | Published | Notes |
|---|---|---|---|---|---|
| `excel-mcp-server` | stable | 1.0.0 | Excel Skill Team | [excelmcpserver.dev](https://excelmcpserver.dev) | Windows Excel automation (COM interop, Power Query, DAX, formatting) |

### `excel-mcp-server`

- **Type:** Library plugin
- **Published npm:** `@bradygaster/excel-mcp-server`
- **Repository:** [https://github.com/bradygaster/excel-mcp-server](https://github.com/bradygaster/excel-mcp-server)
- **Skills:** Excel file operations, workbook/sheet management, Power Query, DAX formulas, PivotTables, formatting, VBA
- **Architecture:** Standalone MCP server, no APM required
- **Stable:** Yes — production-ready for Windows environments
- **Last Release:** 2026-03-19 (v1.0.0)

## Customer-Facing Plugins

Customer-facing plugins are **complete workflows** with skills, agents, and system prompts. These are specialized assistants designed for specific user-facing use cases.

*None published yet. First customer-facing plugin expected: Q2 2026.*

## Planning / In Development

Plugins currently under development or in planning phase:

*None at this time.*

## Deprecated Plugins

*None at this time.*

---

## How to Add a Plugin

1. Develop your plugin in a dev repo with the directory structure defined in [`docs/FORGE.md`](../../docs/FORGE.md).
2. Validate locally using the plugin validation script: `npm run validate:plugins` (if present in dev repo).
3. Publish your plugin to npm (for library plugins) or GitHub Pages/static hosting (for customer-facing plugins).
4. Submit a pull request to this repository updating `squads/forge/PLUGINS.md` with your plugin entry, following the format above.
5. Include your plugin's:
   - Type (library or customer-facing)
   - Current status (dev, beta, stable, deprecated)
   - Published location (npm package name, GitHub repo, or docs site)
   - Brief description of skills/agents included

See [`docs/FORGE_SETUP.md`](../../docs/FORGE_SETUP.md) for a complete step-by-step walkthrough using Excel MCP Server as the reference plugin.

## Status Definitions

- **dev** — Under active development; not ready for production use
- **beta** — Published but undergoing active refinement; feedback welcome
- **stable** — Production-ready; actively maintained
- **deprecated** — No longer recommended; consider using alternative plugin

## Publishing Guidelines

### Library Plugin Workflow

1. **Develop** in dev repo under `plugins/<plugin-id>/`
2. **Build** using your dev repo's build script (emit `plugin.json` and skills/)
3. **Publish** to npm as `@organization/plugin-name`
4. **Register** in `PLUGINS.md` with npm package URL and version
5. **Document** skills in your published plugin's README

### Customer-Facing Plugin Workflow

1. **Develop** in dev repo under `plugins/<plugin-id>/` with agents/ and prompts/
2. **Build** complete workflow (skills + agents + prompts)
3. **Publish** to npm or GitHub Pages as complete package
4. **Register** in `PLUGINS.md` with repository/docs URL
5. **Document** agents, example workflows, and integration guide
