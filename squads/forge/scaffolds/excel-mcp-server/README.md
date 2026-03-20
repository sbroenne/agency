# Excel MCP Server Reference Scaffold

Starter surface for a **library plugin** that wraps Excel MCP Server as reusable skills.

## Architecture

- **Plugin type:** library
- **Runtime:** standalone-first
- **APM:** not included by default
- **Why:** the reference use case is reusable spreadsheet automation for other agents, not a customer-facing workflow

## Included files

- `plugin.json` — reference plugin manifest
- `package.json` — minimal package metadata for a standalone plugin repo
- `skills/index.mjs` — starter skill catalog mapped to Excel workbook operations
- `../../workflows/excel-mcp-server/release-plugin-repo.yml` — template release workflow for a dev repo that publishes only this plugin to a dedicated plugin repo

## When to extend this scaffold

Add agents and prompts only if you are intentionally building a **customer-facing plugin** on top of these spreadsheet skills.
