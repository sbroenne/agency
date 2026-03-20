# Forge: Agent Skill Authoring & Distribution

Welcome to **Forge**, the agent skill authoring and distribution system for the Agency squad ecosystem.

Forge provides the architecture, workflows, and guidance for authoring, packaging, and publishing reusable agent skills. This directory is the canonical Forge knowledge pack — containing the skill registry, authoring guides, reference scaffolds, and release workflow templates that ship with the squad.

## Quick Start

> Want the repo agent, not just the docs and manifest? Use [`.github/agents/forge.agent.md`](../../.github/agents/forge.agent.md). The Forge squad manifest advertises Forge in the directory, but the repo agent is hired through `.github/agents/`.

Forge keeps its knowledge here in `agency`; when authoring starts, it creates or adapts a separate working repo locally on the user's machine.

## Core Concepts

Forge focuses on:

- **Agent Skill** — A reusable capability with tools, resources, and instructions that can stand alone or be packaged
- **Skill distribution** — How skills are organized and published (using `plugin.json` as the packaging format)
- **Library skills** — Reusable utilities with no UI (tools-only packages)
- **Customer-facing skills** — Complete workflows with agents and UI (skills + agents + prompts)

### I want to create a skill

Start with the **Excel MCP Server template**:

1. Read [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) — Complete walkthrough using Excel MCP as the template
2. Review [Forge architecture overview](../../docs/FORGE.md) — Understand skill types and design patterns
3. Check [PLUGINS.md](./PLUGINS.md) — See what's already published
4. Copy [workflows/excel-mcp-server/release-plugin-repo.yml](./workflows/excel-mcp-server/release-plugin-repo.yml) into your dev repo when you need to distribute your skills

### I want to publish a skill

Follow the **release workflow**:

1. Read [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) — Step-by-step publication guide
2. Publish to npm (library) or GitHub Pages (customer-facing)
3. Open a PR to update [PLUGINS.md](./PLUGINS.md)

### I want to understand skill distribution architecture

Read the **design documentation**:

1. [docs/FORGE.md](../../docs/FORGE.md) — Skill types, repo topology, registry format
2. [docs/PLUGIN_MANIFEST.md](../../docs/PLUGIN_MANIFEST.md) — Complete `plugin.json` schema
3. [docs/FORGE_SETUP.md](../../docs/FORGE_SETUP.md) — Step-by-step dev repo setup
4. [docs/FORGE_QUICK_REF.md](../../docs/FORGE_QUICK_REF.md) — Quick lookup reference

## Files in This Directory

| File | Purpose |
|---|---|
| **squad.json** | Forge squad manifest (this is a Squad too!) |
| **PLUGINS.md** | Registry of all published skills and distributions |
| **EXCEL_MCP_AUTHORING.md** | Template & walkthrough for Excel MCP library skill |
| **RELEASE_WORKFLOW.md** | Publication process from dev to npm/GitHub Pages |
| **README.md** | This file |
| **home/** | Tracking area for created skills and reuse opportunities |
| **scaffolds/** | Starter artifacts (copy into your dev repo) |
| **workflows/** | Decision flows, architecture recommendations, and release workflow templates |

## Skill Distribution Types

Forge supports two skill distribution categories:

### Library Skills (Tools-Only)

Reusable utilities with **no agents or UI**. Skills are stateless and can be integrated into multiple workflows.

**Example:** [Excel MCP Server](https://excelmcpserver.dev)
- Pure skills: file operations, formatting, Power Query, DAX
- No agents, no UI, no complex state
- Published to npm as `@bradygaster/excel-mcp-server`
- Used by: Excel automation workflows, reporting agents, data processing pipelines

**When to choose:** You're building a general-purpose utility that other teams will reuse.

### Customer-Facing Skills

Complete **workflows with agents and UI**. These are specialized assistants for specific user-facing use cases.

**Example:** Code Reviewer (hypothetical)
- Skills: code analysis, style checking, performance profiling
- Agent: specialized code review behavior
- UI: code review guidelines, reporting format
- Published with complete documentation and setup guide
- Used by: Development teams doing PR reviews

**When to choose:** You're building a complete workflow, not just utility functions.

## Skill Registry

The **PLUGINS.md** file tracks all published skills and distributions:

- **Status tracking** — dev / beta / stable / deprecated
- **Discovery** — Browse available skills
- **Versioning** — Know which version is production-ready
- **Maintenance** — See who owns each skill

### Current Skills

- ✅ **excel-mcp-server** (stable) — Windows Excel automation, published to npm

Expected in Q2:
- Code Reviewer (customer-facing)
- Data Transform Toolkit (library)

## Development Workflows

### For Skill Authors

1. **Set up dev repo** — Follow [FORGE_SETUP.md](../../docs/FORGE_SETUP.md)
2. **Author your skill** — Use [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) as template
3. **Test locally** — `npm test`, `npm run validate`
4. **Publish** — use the release workflow template to distribute your skill into the dedicated repo, then publish from there
5. **Register** — Update [PLUGINS.md](./PLUGINS.md) and `home/catalog.json`

### For Teams Consuming Skills

1. **Browse skills** — Check [PLUGINS.md](./PLUGINS.md) for available options
2. **Review documentation** — Each skill distribution has a README with full API docs
3. **Install** — `npm install @bradygaster/skill-name` (library) or import from published site
4. **Integrate** — Follow skill documentation for integration

## Architecture Decisions

Key decisions baked into Forge:

1. **Lean by default** — Start simple, add APM only when needed
2. **Standalone-first** — Skills should work independently
3. **Skill-focused** — Library distributions emphasize reusable utilities
4. **Clear typing** — Every skill has a complete JSON Schema
5. **Questionnaire-based** — Architecture recommendations, not requirements

See [docs/FORGE_DESIGN_PHILOSOPHY.md](../../docs/FORGE_DESIGN_PHILOSOPHY.md) for detailed rationale.

## API Reference

### Skill Manifest (`plugin.json`)

```json
{
  "id": "skill-id",
  "name": "Skill Name",
  "version": "1.0.0",
  "type": "library|customer-facing",
  "description": "...",
  "skills": [
    { "id": "tool-id", "name": "Tool Name", "description": "..." }
  ],
  "repository": "https://github.com/...",
  "published": { "npm": "package-name" },
  "status": "dev|beta|stable|deprecated"
}
```

Full schema: [docs/PLUGIN_MANIFEST.md](../../docs/PLUGIN_MANIFEST.md)

### Directory Structure

```
plugins/excel-mcp-server/
├── plugin.json                    # Manifest
├── package.json                   # npm metadata
├── README.md                      # User documentation
├── skills/
│   └── excel-file-ops/
│       ├── index.js              # Skill implementation
│       └── schema.json           # Tool schema
└── tests/
    └── excel-file-ops.test.js    # Tests
```

Full walkthrough: [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md)

## Tools & Scripts

### Validation

```bash
npm run validate:plugins    # Validate all plugins in dev repo
npm test                    # Run full test suite
```

### Building

```bash
npm run build               # Compile TypeScript
npm run docs                # Generate API documentation
```

### Publishing

```bash
npm publish                 # Publish library plugin to npm
npm run deploy              # Deploy customer-facing plugin to GitHub Pages
```

### Local Testing

```bash
npm run test:watch         # Watch tests during development
npm run docs:serve         # Preview documentation locally
```

## CI/CD

The repository includes automated workflows:

- **forge-plugin-validate.yml** — Validates plugin entries in PLUGINS.md on PRs
- Checks registry format, plugin fields, and documentation links
- **workflows/excel-mcp-server/release-plugin-repo.yml** — Template for dev-repo to published-plugin-repo releases

See [.github/workflows/forge-plugin-validate.yml](../../.github/workflows/forge-plugin-validate.yml)

## FAQ

### Q: Do I need APM for my plugin?

**A:** Not initially. Use the questionnaire in [docs/FORGE.md](../../docs/FORGE.md):
- Single utility + no complex state? → Skip APM, keep it simple
- Complete workflow + routing/agents? → Consider APM

Excel MCP Server demonstrates the simple path — zero APM needed.

### Q: What's the difference between a Forge plugin and a skill?

**A:** 
- **Skill** — Single utility function (e.g., "create Excel workbook")
- **Forge plugin** — Package that distributes one or more skills and, for customer-facing cases, may also include agents and prompts (e.g., "Excel MCP Server")

Forge plugins are published packages; skills are the building blocks inside them.

### Q: Can I publish a plugin without going through this repo?

**A:** Yes. The Forge registry is optional — plugins can be published directly to npm or GitHub Pages. To be **discoverable** in the Forge ecosystem, register in PLUGINS.md.

### Q: How often should I update the PLUGINS.md?

**A:** Whenever you release a new version or change status. Aim to keep registry within 1 week of published releases.

## Contributing

To add a plugin to the Forge registry:

1. Publish your plugin to npm (library) or GitHub Pages (customer-facing)
2. Fork this repository
3. Update [PLUGINS.md](./PLUGINS.md) following the template format
4. Open a PR with description of your plugin
5. Address feedback from Forge team review
6. Merge and deploy

See [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) for complete publication guide.

## Resources

**Documentation:**
- [Forge Overview](../../docs/FORGE.md) — Plugin architecture
- [Plugin Manifest Schema](../../docs/PLUGIN_MANIFEST.md) — Complete reference
- [Forge Setup Guide](../../docs/FORGE_SETUP.md) — Dev repo walkthrough
- [Design Philosophy](../../docs/FORGE_DESIGN_PHILOSOPHY.md) — Why Forge works this way

**Examples:**
- [Excel MCP Server Repository](https://github.com/bradygaster/excel-mcp-server) — Production library plugin
- [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) — Complete template with code samples

**Learning:**
- [Squad CLI Documentation](https://github.com/bradygaster/squad-cli) — How squads work
- [MCP Specification](https://modelcontextprotocol.io) — Protocol for AI context
- [npm Publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## Support

- **Plugin authoring questions** → See [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md)
- **Release process questions** → See [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md)
- **Architecture decisions** → See [docs/FORGE.md](../../docs/FORGE.md)
- **Schema reference** → See [docs/PLUGIN_MANIFEST.md](../../docs/PLUGIN_MANIFEST.md)

---

**Last Updated:** 2026-03-19  
**Forge Status:** Active  
**First Reference Plugin:** Excel MCP Server (stable, v1.0.0)
