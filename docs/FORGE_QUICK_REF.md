# Forge Quick Reference

Quick-reference guide for Forge plugin decisions and workflows.

Use **Forge plugin** for the `plugin.json` package model in this repo, and keep that term separate from **VS Code extensions**, **GitHub CLI extensions**, and **Agent Skills**.

**Concrete starter in this repo:** `squads/forge/workflows/excel-mcp-server/workflow.json` + `squads/forge/scaffolds/excel-mcp-server/` + `squads/forge/home/catalog.json`

**Boundary:** Forge knowledge stays here in `agency`; the actual plugin working repo gets created locally when authoring starts.

## Plugin Type Decision Tree

```
┌─ What are you building?
│
├─ Single reusable utility (Excel automation, JSON formatter, HTTP client, etc.)
│  └─→ LIBRARY PLUGIN ✓
│      • Skills only, no agents/prompts
│      • No UI, purely functional
│      • Publish to npm or private registry
│      • Example: excel-mcp-server (Excel MCP Server wrapper)
│      • Example: @myorg/skill-json-parser
│
└─ Complete workflow with agent behavior (code reviewer, doc generator, etc.)
   └─→ CUSTOMER-FACING PLUGIN ✓
       • Skills + agents + system prompts
       • May include UI/UX decisions
       • Does it need complex state/routing?
       │
       ├─ No → Keep it simple, skip APM
       │   └─ Just skills, agents, and prompts
       │
       └─ Yes → Introduce APM (Advanced Plugin Management)
           └─ Handles stateful workflows, routing, persistence
```

## File Structure Quick Reference

### Minimal Library Plugin

```
my-plugin/
├── plugin.json
├── package.json
└── README.md
```

### Minimal Customer-Facing Plugin

```
my-plugin/
├── plugin.json
├── package.json
├── skills/
│   └── analyzeCode.js
├── agents/
│   └── reviewer.js
├── prompts/
│   └── system.txt
└── README.md
```

## plugin.json Essentials

### Library Plugin: Excel MCP Server Example

```json
{
  "name": "excel-mcp-server",
  "version": "1.0.0",
  "type": "library",
  "description": "MCP server for automating Microsoft Excel operations on Windows",
  "homepage": "https://excelmcpserver.dev",
  "maintainer": {
    "name": "Platform Team",
    "email": "platform@org.com"
  },
  "status": "stable",
  "skills": [
    {
      "name": "readExcel",
      "description": "Read data from Excel workbooks and ranges"
    },
    {
      "name": "writeExcel",
      "description": "Write data to Excel workbooks and ranges"
    },
    {
      "name": "createPivotTable",
      "description": "Create and configure Excel pivot tables"
    }
  ],
  "published": {
    "registry": "npm",
    "package": "@myorg/excel-mcp-server",
    "url": "https://www.npmjs.com/package/@myorg/excel-mcp-server",
    "releaseDate": "2026-03-20T00:00:00Z"
  },
  "tags": ["excel", "windows", "automation", "mcp"]
}
```

### Customer-Facing Plugin

```json
{
  "name": "my-agent",
  "version": "1.0.0",
  "type": "customer-facing",
  "description": "What it does",
  "maintainer": {
    "name": "Team Name",
    "email": "team@org.com"
  },
  "status": "dev",
  "skills": [
    {
      "name": "skillOne",
      "description": "Skill 1"
    }
  ],
  "agents": [
    {
      "name": "myAgent",
      "description": "Agent description",
      "capabilities": ["skillOne"]
    }
  ]
}
```

## Status Lifecycle

```
dev ──────→ beta ──────→ stable ──────→ deprecated
(building) (testing)  (production)   (sunsetting)
```

## PLUGINS.md Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| `dev` | Work in progress, not ready for use | Under development |
| `beta` | Ready for testing, may have breaking changes | Test and provide feedback |
| `stable` | Production-ready, follows semver | Use in production |
| `deprecated` | No longer maintained, avoid new usage | Migrate to replacement |

## Dev Repo Commands

```bash
# Validate all plugins
npm run validate

# Build PLUGINS.md registry
npm run build:plugins

# Run tests
npm test

# Before releasing
npm run release:check
```

## Release Checklist

- [ ] All plugins pass `npm run validate`
- [ ] Tests pass: `npm test`
- [ ] CHANGELOG.md updated with version and release notes
- [ ] Version bumped in `plugin.json` and `package.json`
- [ ] `PLUGINS.md` shows new version
- [ ] Commit and tag: `git tag plugin-name@1.0.0`
- [ ] Push tag to trigger CI release workflow
- [ ] Verify published to registry (npm, GitHub releases, etc.)
- [ ] Update Agency's Forge registry entry with published URL

## Common Mistakes

❌ **Library plugin with agents** — Library plugins must be skills-only  
✓ **Skills only in library plugin**

❌ **Customer-facing plugin with no agents** — Customer-facing requires at least one agent  
✓ **Customer-facing plugin has agents**

❌ **Status other than dev/beta/stable/deprecated** — Invalid status value  
✓ **Status is one of the four allowed values**

❌ **Version doesn't follow semver** — Not a valid semantic version  
✓ **Version follows X.Y.Z format (e.g., 1.0.0)**

❌ **PLUGINS.md drifts from reality** — stale registry entries confuse release decisions  
✓ **Either regenerate `PLUGINS.md` via `npm run build:plugins` or update it alongside the home tracker in lean repos**

## When to Add APM (Advanced Plugin Management)

**Add APM if your customer-facing plugin needs:**
- State persistence across calls
- Stateful workflows (e.g., multi-turn conversations)
- Complex routing between agents
- Message queue or async processing
- User session tracking
- Configuration storage per-user

**Skip APM if your plugin:**
- Runs independently with each call
- Has no state between invocations
- Just chains skills sequentially
- Only needs system prompts

## Documentation

- **FORGE.md** — Full architecture overview
- **PLUGIN_MANIFEST.md** — Complete schema and examples
- **FORGE_SETUP.md** — Setting up your first dev repo
- **README.md** — Forge section with links

## Questions?

Refer to the appropriate guide:
- "How do I set up a dev repo?" → **FORGE_SETUP.md**
- "What's the full manifest schema?" → **PLUGIN_MANIFEST.md**
- "What are the architectural decisions?" → **FORGE.md**
