---
name: "plugin-home-registry"
description: "How to set up a plugin ecosystem home with registry tracking, authoring guides, and release workflows"
domain: "plugin-architecture"
confidence: "high"
source: "earned"
tools:
  - name: "markdown-documentation"
    description: "Create human-readable registries, authoring templates, and workflow guides"
    when: "Use when building plugin ecosystem home with entry points for different roles (authors, publishers, users)"
  - name: "github-actions"
    description: "Validate registry format and plugin entries on PRs"
    when: "Use when you need automated checks to keep registry accurate and consistent"
---

## Context

Use this when building a plugin ecosystem home where:
- Teams create and publish plugins
- You need a central registry tracking all plugins (with status, version, maintainer)
- Authors need concrete templates and step-by-step guides
- Release processes need documentation
- Plugin entries must be validated automatically

## Patterns

### Structure the Plugin Home

Create a `forge/` or `plugins/` directory with:
- **README.md** — Hub/navigation for different roles (author, publisher, user)
- **PLUGINS.md** — Human-readable registry table with status, version, maintainer, published location
- **Authoring guide** — Step-by-step template using a concrete, production-ready reference plugin
- **Release workflow** — Documented publication process (dev → npm/GitHub Pages → registry update)

### Reference Plugin Model

Use a real, production-ready plugin as the template:
- **Not hypothetical** — Already published, not a thought experiment
- **Exemplifies plugin type** — Show the simple path (e.g., library/skills-only with zero APM)
- **Includes code examples** — Concrete samples in authoring guide
- **Has release timeline** — Realistic progression from development to stable

### Registry Format

Use markdown table format for PLUGINS.md:
```markdown
| Plugin Name | Status | Version | Maintainer | Published | Notes |
|---|---|---|---|---|---|
| `plugin-id` | stable | 1.0.0 | Team Name | [link](url) | Brief description |
```

Benefits:
- **Human-readable** — Easy to scan and understand
- **Version-controllable** — Changes tracked in Git
- **Auto-traceable** — Can be generated from plugin.json entries in CI
- **Extensible** — Additional columns can be added as ecosystem grows

### Publication Models

Document different publication paths:
- **Library plugins** (skills-only) → npm package as `@org/plugin-name`
- **Customer-facing plugins** (complete workflows) → GitHub Pages or static hosting

Clarify when each model applies and how they're published/distributed.

### Validation Automation

Create a GitHub Actions workflow that:
- Triggers on registry file changes
- Validates required sections (Library, Customer-Facing, Status Definitions)
- Checks plugin entries have valid status (dev/beta/stable/deprecated)
- Verifies documentation links
- Reports results on PRs

### Entry Points by Role

Structure navigation to serve different users:
- **Authors** — "I want to create a plugin" → AUTHORING_GUIDE.md
- **Publishers** — "I want to publish my plugin" → RELEASE_WORKFLOW.md
- **Users** — "I want to find plugins" → PLUGINS.md registry
- **Architects** — "I want to understand the design" → ../docs/

## Examples

**Forge home structure:**
```
forge/
├── README.md                      # Hub with role-based navigation
├── PLUGINS.md                     # Registry (library + customer-facing)
├── EXCEL_MCP_AUTHORING.md        # Step-by-step template (reference: excel-mcp-server)
├── RELEASE_WORKFLOW.md            # Publication process docs
└── squad.json                     # Forge itself as a Squad
```

**PLUGINS.md section:**
```markdown
## Library Plugins

| Plugin Name | Status | Version | Maintainer | Published | Notes |
|---|---|---|---|---|---|
| `excel-mcp-server` | stable | 1.0.0 | Excel Skill Team | [@bradygaster/excel-mcp-server](npm) | Windows Excel automation |

## Customer-Facing Plugins

*None published yet. First plugin expected Q2.*
```

**GitHub workflow validation:**
- Check PLUGINS.md sections exist
- Validate plugin status is one of: dev/beta/stable/deprecated
- Verify URLs are formatted correctly
- Run on forge/** and PLUGINS.md path changes

## Anti-Patterns

- **Hypothetical plugins as examples** — Use real, published plugins (reduces credibility, causes confusion)
- **Status field without definitions** — Always document status meanings (dev vs beta vs stable)
- **No publication guidance** — Teams need clear steps from code → npm/GitHub Pages → registry
- **Single publication model** — Document different paths for different plugin types
- **No automation** — Validate registry manually instead of CI checks (registry drifts from reality)
- **Overcomplicated templates** — Avoid forcing APM or complexity; show the lean path first

## Next Steps

1. **Plugin submission** — Create PR template for adding plugins to registry
2. **Auto-generation** — Build CI script to generate PLUGINS.md from plugin.json entries
3. **Registry UI** — Design visual registry browser (future enhancement)
4. **Gradual rollout** — Publish second plugin to demonstrate second plugin type
5. **Community** — Share plugin home pattern with broader ecosystem

## Verification

- ✓ README provides clear navigation for different roles
- ✓ PLUGINS.md table format validates in CI
- ✓ Authoring guide uses concrete reference plugin (not generic examples)
- ✓ Release workflow documents both publication models
- ✓ GitHub Actions validates registry format on every PR
- ✓ Documentation links between home and arch docs verified
