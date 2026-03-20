# Forge: Authoring Prompts, Agents, and Skills for Plugins

Welcome to **Forge**, the authoring and plugin system for reusable prompts, custom agents, and agent skills in the Agency squad ecosystem.

Forge provides the architecture, workflows, and guidance for authoring prompts, custom agents (AGENT.md-style), and agent skills, packaging them as plugins for GitHub Copilot. This directory is the canonical Forge knowledge pack — containing the plugin registry, authoring guides, reference scaffolds, and release workflow templates that ship with the squad.

## Quick Start

> Want the repo agent, not just the docs and manifest? Use [`.github/agents/forge.agent.md`](../../.github/agents/forge.agent.md). The Forge squad manifest advertises Forge in the directory, but the repo agent is hired through `.github/agents/`.

Forge keeps its knowledge here in `agency`; when authoring starts, it creates or adapts a separate working repo locally on the user's machine.

## Core Concepts

Forge helps you author and organize three types of reusable assets:

- **Prompts** — System prompts, few-shot examples, and conversation starters for agent use cases
- **Custom Agents** — AGENT.md-style agent definitions with instructions, behaviors, and tool bindings
- **Agent Skills** — Reusable capabilities with tools, resources, and instructions that stand alone or are packaged

These authoring units can be packaged as:

- **Plugin** — User-facing deliverable of prompts, custom agents, and/or skills, packaged as `plugin.json` and distributed via npm or GitHub
- **Distribution Type** — Internal classification: library (skills only) or customer-facing (complete workflows)

### I want to author a prompt or agent

Start with Forge basics:

1. Read [Forge architecture overview](../../docs/FORGE.md) — Understand authoring units (prompts, agents, skills) and distribution types
2. Review the structure in [CHARTER.md](./CHARTER.md) — See how prompts and agents fit into distributions
3. Check [PLUGINS.md](./PLUGINS.md) — See what's already published

### I want to author an agent skill

Start with the **Excel MCP Server template**:

1. Read [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) — Complete walkthrough using Excel MCP as the template
2. Review [Forge architecture overview](../../docs/FORGE.md) — Understand skill types and design patterns
3. Check [PLUGINS.md](./PLUGINS.md) — See what's already published
4. Copy [workflows/excel-mcp-server/release-plugin-repo.yml](./workflows/excel-mcp-server/release-plugin-repo.yml) into your dev repo when ready to distribute

### I want to package authoring units into a distribution

Follow the **distribution workflow**:

1. Read [docs/FORGE.md](../../docs/FORGE.md) — Understand distribution types (library vs. customer-facing)
2. Use [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) — Step-by-step publication guide
3. Publish to npm (library) or GitHub Pages (customer-facing)
4. Open a PR to update [PLUGINS.md](./PLUGINS.md) with your distribution

### I want to understand the authoring and distribution architecture

Read the **design documentation**:

1. [docs/FORGE.md](../../docs/FORGE.md) — Authoring units, distribution types, repo topology, registry format
2. [docs/PLUGIN_MANIFEST.md](../../docs/PLUGIN_MANIFEST.md) — Complete `plugin.json` schema
3. [docs/FORGE_SETUP.md](../../docs/FORGE_SETUP.md) — Step-by-step dev repo setup
4. [docs/FORGE_QUICK_REF.md](../../docs/FORGE_QUICK_REF.md) — Quick lookup reference

## Files in This Directory

| File | Purpose |
|---|---|
| **squad.json** | Forge squad manifest (this is a Squad too!) |
| **PLUGINS.md** | Registry of all published distributions |
| **EXCEL_MCP_AUTHORING.md** | Template & walkthrough for Excel MCP library distribution |
| **RELEASE_WORKFLOW.md** | Publication process from dev to npm/GitHub Pages |
| **README.md** | This file |
| **home/** | Tracking area for created distributions and reuse opportunities |
| **scaffolds/** | Starter artifacts (copy into your dev repo) |
| **workflows/** | Decision flows, architecture recommendations, and release workflow templates |

## Distribution Types

Forge supports two categories:

### Library Distributions (Skills-Only)

Reusable utilities with **skills only**; no custom agents or prompts. Skills are stateless and can be integrated into multiple workflows.

**Example:** [Excel MCP Server](https://excelmcpserver.dev)
- Agent Skills: file operations, formatting, Power Query, DAX
- No custom agents, no custom prompts, no complex state
- Published to npm as `@bradygaster/excel-mcp-server`
- Used by: Excel automation workflows, reporting agents, data processing pipelines

**When to choose:** You're building a general-purpose utility that other teams will reuse through their own agents or workflows.

### Customer-Facing Distributions

**Complete workflows with skills, custom agents, and prompts**. Specialized assistants designed for specific user-facing use cases.

**Example:** Code Reviewer (hypothetical)
- Agent Skills: code analysis, style checking, performance profiling
- Custom Agent: Code reviewer persona with specialized behavior
- Prompts: System prompts guiding code review workflow
- Published with complete documentation and setup guide
- Used by: Development teams doing PR reviews, bundled into Copilot plugins

**When to choose:** You're building a complete workflow with a specialized agent persona and guiding prompts, not just reusable utilities.

## Distribution Registry

The **PLUGINS.md** file tracks all published distributions:

- **Status tracking** — dev / beta / stable / deprecated
- **Discovery** — Browse available distributions and their contents
- **Versioning** — Know which version is production-ready
- **Maintenance** — See who owns each distribution

### Current Distributions

- ✅ **excel-mcp-server** (stable) — Windows Excel automation (library distribution), published to npm

Expected in Q2:
- Code Reviewer (customer-facing distribution)
- Data Transform Toolkit (library distribution)

## Development Workflows

### For Authoring Prompts and Agents

1. **Understand the model** — Read [docs/FORGE.md](../../docs/FORGE.md) to see how prompts and agents fit into distributions
2. **Author your artifact** — Create prompts/ or agents/ in your dev repo
3. **Test locally** — Verify with `npm test`
4. **Package** — Include in a distribution with related agent skills
5. **Register** — Update [PLUGINS.md](./PLUGINS.md) and `home/catalog.json` when published

### For Authoring Agent Skills

1. **Set up dev repo** — Follow [FORGE_SETUP.md](../../docs/FORGE_SETUP.md)
2. **Author your skill** — Use [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) as template
3. **Test locally** — `npm test`, `npm run validate`
4. **Organize into distribution** — Group related skills and any agents/prompts
5. **Publish** — Use the release workflow template to prepare and publish your distribution from its dedicated repo
6. **Register** — Update [PLUGINS.md](./PLUGINS.md) and `home/catalog.json`

### For Teams Consuming Distributions

1. **Browse distributions** — Check [PLUGINS.md](./PLUGINS.md) for available options
2. **Review documentation** — Each published distribution has a README with full API docs and setup guide
3. **Install** — `npm install @bradygaster/skill-distribution-name` (library) or import from published site
4. **Integrate** — Follow distribution documentation for integration into your agents or workflows

## Architecture Decisions

Key decisions baked into Forge:

1. **Lean by default** — Start simple, add APM only when needed
2. **Standalone-first** — Skills should work independently
3. **Distribution-aware** — Library distributions emphasize reusable utilities; customer-facing distributions combine prompts, agents, and skills
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

### Q: What's the difference between an agent skill, a distribution, and a Copilot plugin?

**A:**
- **Agent Skill** — A reusable capability with tools and resources (e.g., "Excel file operations"; author one or group multiple)
- **Prompt** — System prompt, few-shot examples, or conversation starter for agent use cases (author alongside skills)
- **Custom Agent** — AGENT.md-style agent definition with instructions and behavior (author alongside skills and prompts)
- **Distribution** — Package that organizes prompts, agents, and/or skills (e.g., "Excel MCP Server" = skills only; "Code Reviewer" = skills + custom agent + prompts)
- **GitHub Copilot Plugin** — Installable bundle that includes one or more Forge distributions, custom agents, prompts, hooks, and slash commands for Copilot marketplace installation

Distributions are how you organize authoring units. Copilot plugins are how you deliver them to Copilot users.

### Q: Can I publish a distribution without going through this repo?

**A:** Yes. The Forge registry is optional — distributions can be published directly to npm or GitHub Pages. To be **discoverable** in the Forge ecosystem, register in PLUGINS.md.

### Q: How often should I update PLUGINS.md?

**A:** Whenever you release a new distribution version or change status. Aim to keep registry within 1 week of published releases.

## Contributing

To add a distribution to the Forge registry:

1. Publish your distribution to npm (library distribution) or GitHub Pages (customer-facing distribution)
2. Fork this repository
3. Update [PLUGINS.md](./PLUGINS.md) following the template format
4. Open a PR with description of your distribution
5. Address feedback from Forge team review
6. Merge and deploy

See [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md) for complete publication guide.

## Resources

**Documentation:**
- [Forge Overview](../../docs/FORGE.md) — Authoring units, distribution architecture
- [Plugin Manifest Schema](../../docs/PLUGIN_MANIFEST.md) — Complete `plugin.json` reference
- [Forge Setup Guide](../../docs/FORGE_SETUP.md) — Dev repo walkthrough
- [Design Philosophy](../../docs/FORGE_DESIGN_PHILOSOPHY.md) — Why Forge works this way
- [Copilot Plugin vs Skill Boundary](../../.squad/skills/copilot-plugin-vs-skill-boundary/SKILL.md) — Understand the distinction

**Examples:**
- [Excel MCP Server Repository](https://github.com/bradygaster/excel-mcp-server) — Production library distribution (agent skills only)
- [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md) — Complete authoring template with code samples

**Learning:**
- [Squad CLI Documentation](https://github.com/bradygaster/squad-cli) — How squads work
- [MCP Specification](https://modelcontextprotocol.io) — Protocol for AI context
- [npm Publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

## Support

- **Agent skill authoring questions** → See [EXCEL_MCP_AUTHORING.md](./EXCEL_MCP_AUTHORING.md)
- **Prompt and custom agent authoring** → See [docs/FORGE.md](../../docs/FORGE.md)
- **Distribution and release process** → See [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md)
- **Architecture and design questions** → See [docs/FORGE.md](../../docs/FORGE.md)
- **Manifest and schema reference** → See [docs/PLUGIN_MANIFEST.md](../../docs/PLUGIN_MANIFEST.md)

---

**Last Updated:** 2026-03-19  
**Forge Status:** Active  
**First Reference Distribution:** Excel MCP Server (library distribution, stable, v1.0.0)
