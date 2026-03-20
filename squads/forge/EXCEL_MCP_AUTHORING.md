# Excel MCP Server Agent Skill Authoring Guide

This guide walks you through authoring agent skills for a library distribution using **Excel MCP Server** as the template. You'll learn both **Forge's portable SKILL.md format** (Layer 1: what you author) and **plugin.json packaging** (Layer 2: how you organize).

## Overview

**Excel MCP Server** provides Windows Excel automation via MCP (Model Context Protocol). It's a **library distribution** — meaning it contains agent skills only with no custom agents or prompts. The distribution is published as an npm package and integrated into workflows that need Excel capabilities.

### The Three-Layer Model in Action

```
Layer 1: Author Skills with SKILL.md
  ├─ skills/excel-file-ops/SKILL.md
  ├─ skills/excel-formatting/SKILL.md
  ├─ skills/power-query/SKILL.md
  └─ skills/dax-formulas/SKILL.md
          │
          ▼
Layer 2: Organize into Distribution with plugin.json
  └─ plugin.json (lists all skills + metadata)
          │
          ▼
Layer 3: Publish as GitHub Copilot Plugin
  └─ @bradygaster/excel-mcp-server (npm package)
```

**Key insight:** Each skill is independently portable (SKILL.md format). plugin.json coordinates them for packaging. Users install the npm package and get all skills together.

### Why This Template?

- ✅ **Lean by default** — minimal dependencies, no complex state management
- ✅ **Skills-focused** — pure utility distribution, reusable anywhere
- ✅ **Portable skills** — each skill documented with SKILL.md, can be reused elsewhere
- ✅ **Windows-native** — uses COM interop for native Excel API access
- ✅ **Production-ready** — published to npm, stable version released

## Distribution Structure

Excel MCP Server follows the Forge library distribution layout:

```
excel-mcp-server/
├── package.json              # Distribution metadata and dependencies
├── plugin.json               # Distribution manifest (coordinates skills)
├── README.md                 # Usage documentation
├── skills/
│   ├── excel-file-ops/
│   │   ├── SKILL.md         # Portable skill documentation
│   │   ├── index.js         # File operations implementation
│   │   └── schema.json      # Tool schema
│   ├── excel-formatting/
│   │   ├── SKILL.md         # Portable skill documentation
│   │   ├── index.js         # Formatting implementation
│   │   └── schema.json
│   ├── power-query/
│   │   ├── SKILL.md         # Portable skill documentation
│   │   ├── index.js         # Power Query M code generator
│   │   └── schema.json
│   └── dax-formulas/
│       ├── SKILL.md         # Portable skill documentation
│       ├── index.js         # DAX formula builder
│       └── schema.json
├── tests/
│   ├── excel-file-ops.test.js
│   ├── excel-formatting.test.js
│   └── integration.test.js
└── CHANGELOG.md
```

### Key Files

#### `skills/excel-file-ops/SKILL.md` (Portable Skill Documentation)

```json
{
  "id": "excel-mcp-server",
  "name": "Excel MCP Server",
  "version": "1.0.0",
  "type": "library",
  "description": "Windows Excel automation via MCP",
  "keywords": ["excel", "windows", "com", "automation", "mcp"],
  "repository": "https://github.com/bradygaster/excel-mcp-server",
  "homepage": "https://excelmcpserver.dev",
  "published": {
    "npm": "@bradygaster/excel-mcp-server",
    "registry": "https://registry.npmjs.org"
  },
  "skills": [
    {
      "id": "excel-file-ops",
      "name": "Excel File Operations",
      "description": "Create, open, save, close workbooks and sheets"
    },
    {
      "id": "excel-formatting",
      "name": "Excel Formatting",
      "description": "Format cells, ranges, fonts, colors, borders"
    },
    {
      "id": "power-query",
      "name": "Power Query M Code",
      "description": "Generate and manage Power Query M expressions"
    },
    {
      "id": "dax-formulas",
      "name": "DAX Formula Builder",
      "description": "Create and optimize DAX measures and calculated columns"
    }
  ],
  "engines": {
    "node": ">=18.0.0"
  },
  "status": "stable"
}
```

#### `package.json`

```json
{
  "name": "@bradygaster/excel-mcp-server",
  "version": "1.0.0",
  "description": "Windows Excel automation via MCP",
  "type": "module",
  "main": "./dist/index.js",
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./skills/excel-file-ops": "./dist/skills/excel-file-ops/index.js",
    "./skills/excel-formatting": "./dist/skills/excel-formatting/index.js",
    "./skills/power-query": "./dist/skills/power-query/index.js",
    "./skills/dax-formulas": "./dist/skills/dax-formulas/index.js"
  },
  "scripts": {
    "build": "tsc",
    "test": "node --test tests/**/*.test.js",
    "test:watch": "node --test --watch tests/**/*.test.js",
    "validate": "node scripts/validate-plugin.js",
    "docs": "jsdoc -c jsdoc.json"
  },
  "keywords": [
    "excel",
    "windows",
    "mcp",
    "automation",
    "com"
  ],
  "author": "Bradygaster",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "os": [
    "win32"
  ]
}
```

## Authoring Steps

### Step 1: Initialize Your Dev Repository

Create a new dev repo for skill distributions:

```bash
mkdir my-forge-dev
cd my-forge-dev
git init
npm init -y
```

### Step 2: Create Plugin Directory Structure

```bash
mkdir -p plugins/excel-mcp-server/skills
mkdir -p plugins/excel-mcp-server/tests
cd plugins/excel-mcp-server
```

### Step 3: Define the Plugin Manifest

Create `plugin.json` in your plugin directory. Use the template above, customizing:
- `id` — lowercase, hyphenated identifier
- `name` — human-readable plugin name
- `description` — what the plugin does
- `skills` — list of skills in your plugin
- `repository` — your GitHub repo URL
- `published.npm` — your npm package name

### Step 4: Implement Skills

Each skill is a separate JavaScript module with an exported function:

**skills/excel-file-ops/index.js:**
```javascript
export const createWorkbook = async (filename) => {
  // Implementation: Create Excel workbook using COM
  // Return: {success: true, path: "..."}
};

export const openWorkbook = async (path) => {
  // Implementation: Open existing workbook
};

export const closeWorkbook = async (workbookId) => {
  // Implementation: Close workbook
};

// Export all tools for registration
export const tools = [
  { name: "createWorkbook", description: "...", handler: createWorkbook },
  { name: "openWorkbook", description: "...", handler: openWorkbook },
  { name: "closeWorkbook", description: "...", handler: closeWorkbook }
];
```

**skills/excel-file-ops/schema.json:**
```json
{
  "tools": [
    {
      "name": "createWorkbook",
      "description": "Create a new Excel workbook",
      "inputSchema": {
        "type": "object",
        "properties": {
          "filename": {
            "type": "string",
            "description": "Name for the new workbook"
          }
        },
        "required": ["filename"]
      }
    }
  ]
}
```

### Step 5: Create Tests

**tests/excel-file-ops.test.js:**
```javascript
import test from "node:test";
import assert from "node:assert";
import { createWorkbook, openWorkbook } from "../skills/excel-file-ops/index.js";

test("createWorkbook creates file", async () => {
  const result = await createWorkbook("test.xlsx");
  assert.strictEqual(result.success, true);
});

test("openWorkbook opens existing file", async () => {
  const result = await openWorkbook("test.xlsx");
  assert.strictEqual(result.success, true);
});
```

Run tests:
```bash
npm test
```

### Step 6: Document Skills

**README.md:**
```markdown
# Excel MCP Server

Windows Excel automation via MCP.

## Skills

### Excel File Operations
- `createWorkbook` — Create new workbook
- `openWorkbook` — Open existing workbook
- `closeWorkbook` — Close workbook
- `addSheet` — Add worksheet to workbook

### Excel Formatting
- `formatCells` — Apply formatting to range
- `setBorders` — Set cell borders
- `setFontStyle` — Apply font styles

### Power Query
- `generateMCode` — Generate M code for Power Query
- `validateMCode` — Validate M expression syntax

### DAX Formulas
- `createMeasure` — Create calculated measure
- `validateDAX` — Validate DAX expression syntax

## Usage

```javascript
import { createWorkbook, formatCells } from "@bradygaster/excel-mcp-server";

const wb = await createWorkbook("report.xlsx");
await formatCells(wb, "A1:Z10", { bold: true, fontSize: 12 });
```

## Requirements

- Windows operating system
- Node.js 18+
- Excel 2019 or later (or Office 365)
```

### Step 7: Set Up Build and Validation

Create `tsconfig.json` for TypeScript compilation (if using TypeScript):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./skills",
    "strict": true
  }
}
```

Create `scripts/validate-plugin.js`:

```javascript
import { readFileSync } from "fs";

// Validate plugin.json structure
const plugin = JSON.parse(readFileSync("plugin.json"));

const required = ["id", "name", "version", "type", "skills"];
for (const field of required) {
  if (!plugin[field]) {
    console.error(`❌ Missing required field: ${field}`);
    process.exit(1);
  }
}

// Validate skills array
if (!Array.isArray(plugin.skills) || plugin.skills.length === 0) {
  console.error("❌ No skills defined");
  process.exit(1);
}

console.log("✅ Plugin manifest valid");
```

### Step 8: Publish to npm

When your plugin is ready:

```bash
npm run build
npm run test
npm run validate
npm publish
```

### Step 9: Register in Forge PLUGINS.md

Add your plugin to `squads/forge/PLUGINS.md`:

```markdown
| `excel-mcp-server` | stable | 1.0.0 | Excel Skill Team | [excelmcpserver.dev](https://excelmcpserver.dev) | Windows Excel automation |
```

## Best Practices for Library Plugins

1. **Lean dependencies** — Minimize external packages; prefer native APIs where available
2. **Pure skills** — No agents or UI; just stateless utilities
3. **Clear schemas** — Every tool must have complete JSON Schema in `schema.json`
4. **Comprehensive tests** — Test each skill independently
5. **Good documentation** — Every skill needs description, parameters, return values, examples
6. **Semantic versioning** — Follow semver for releases
7. **No state management** — Library plugins don't require APM or complex state; keep them simple

## Moving to Customer-Facing Plugins

Once you're comfortable with library skills, the next step is **customer-facing skill distributions**, which add:

- **Agents** — Custom agent definitions with specialized behavior
- **Prompts** — System prompts and context templates
- **UX considerations** — How agents will be used by end users

See [`docs/FORGE.md`](../../docs/FORGE.md) for the full plugin type comparison.

## Resources

- **[Forge Overview](../../docs/FORGE.md)** — Complete plugin architecture
- **[Plugin Manifest Schema](../../docs/PLUGIN_MANIFEST.md)** — Detailed schema reference
- **[Forge Quick Reference](../../docs/FORGE_QUICK_REF.md)** — Quick lookup
- **[Excel MCP Server Repository](https://github.com/bradygaster/excel-mcp-server)** — Working example
