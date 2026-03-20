# Setting Up a Forge Dev Repo

This guide walks through creating a new Forge dev repository to author and distribute reusable prompts, custom agents, and agent skills. The `plugin.json` file is the implementation format for packaging these authoring units — this guide demonstrates how to use it.

> Want a concrete starting point first? Copy the in-repo Excel reference scaffold at `squads/forge/scaffolds/excel-mcp-server/` and use `squads/forge/workflows/excel-mcp-server/workflow.json` before expanding into the local working repo Forge creates for your distribution.

## Prerequisites

- Node 18.0.0 or later
- Git
- npm

## Initial Setup

### 1. Create Repository Structure

```bash
mkdir my-org-forge && cd my-org-forge
git init

# Create distribution asset directories
mkdir skills agents prompts

# Create tooling directory
mkdir -p tooling/scripts tooling/tests

# Create root files
touch package.json PLUGINS.md README.md
```

### 2. Initialize Package.json

```json
{
  "name": "@myorg/forge-distributions",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "description": "Forge distribution development repository",
  "scripts": {
    "validate": "node tooling/scripts/validate-skills.mjs",
    "build:skills": "node tooling/scripts/build-skills.mjs",
    "test": "node --test tooling/tests/skills.test.mjs",
    "release:check": "npm run validate && npm test"
  },
  "devDependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 3. Create Distribution Manifest Schema

Save as `tooling/schema/distribution-manifest.json`:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Forge Distribution Manifest",
  "type": "object",
  "required": ["name", "version", "description", "type"],
  "properties": {
    "name": {
      "type": "string",
      "pattern": "^[a-z0-9]([a-z0-9-]*[a-z0-9])?$"
    },
    "version": {
      "type": "string",
      "pattern": "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)"
    },
    "type": {
      "type": "string",
      "enum": ["library", "customer-facing"]
    },
    "description": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": ["dev", "beta", "stable", "deprecated"],
      "default": "dev"
    }
  }
}
```

See `docs/PLUGIN_MANIFEST.md` for full schema.

### 4. Create Distribution Validation Script

Save as `tooling/scripts/validate-distributions.mjs`:

```javascript
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);

const schemaPath = resolve('tooling/schema/distribution-manifest.json');
const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const validate = ajv.compile(schema);

const distributionsDir = resolve('skills');
const distributionDirs = readdirSync(distributionsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

let errors = 0;

for (const dir of distributionDirs) {
  const manifestPath = join(distributionsDir, dir, 'plugin.json');
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    
    if (!validate(manifest)) {
      console.error(`❌ ${dir}: Schema validation failed`);
      console.error(validate.errors);
      errors++;
    } else {
      console.log(`✓ ${dir}: Valid (${manifest.type})`);
    }
  } catch (err) {
    console.error(`❌ ${dir}: ${err.message}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\n${errors} distribution(s) failed validation.`);
  process.exit(1);
} else {
  console.log(`\n✓ All distributions passed validation.`);
}
```

### 5. Create Build Script

Save as `tooling/scripts/build-distributions.mjs`:

```javascript
import { readFileSync, readdirSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';

const skillsDir = resolve('skills');
const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const registry = {
  lastUpdated: new Date().toISOString(),
  libraryDistributions: [],
  customerFacingDistributions: [],
  all: []
};

for (const dir of skillDirs) {
  const manifestPath = join(skillsDir, dir, 'plugin.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  
  registry.all.push(manifest);
  
  if (manifest.type === 'library') {
    registry.libraryDistributions.push(manifest);
  } else {
    registry.customerFacingDistributions.push(manifest);
  }
}

// Generate PLUGINS.md
const now = new Date().toLocaleString();
const md = `# Distribution Registry

> Last updated: ${now}

## Library Distributions

| Name | Version | Status | Maintainer |
|------|---------|--------|-----------|
${registry.libraryDistributions.map(p => `| \`${p.name}\` | ${p.version} | ${p.status} | ${p.maintainer?.name || 'N/A'} |`).join('\n')}

## Customer-Facing Distributions

| Name | Version | Status | Maintainer |
|------|---------|--------|-----------|
${registry.customerFacingDistributions.map(p => `| \`${p.name}\` | ${p.version} | ${p.status} | ${p.maintainer?.name || 'N/A'} |`).join('\n')}

---

Generated by \`npm run build:distributions\`
`;

writeFileSync('PLUGINS.md', md);
console.log('✓ Generated PLUGINS.md');
```

### 6. Create Test Suite

Save as `tooling/tests/distributions.test.mjs`:

```javascript
import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const skillsDir = resolve('skills');
const skillDirs = readdirSync(skillsDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

test('Distribution manifests exist and are valid JSON', async (t) => {
  for (const dir of skillDirs) {
    await t.test(`${dir}/plugin.json is valid`, () => {
      const manifestPath = join(skillsDir, dir, 'plugin.json');
      const content = readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(content);
      
      assert.ok(manifest.name, 'name is required');
      assert.ok(manifest.version, 'version is required');
      assert.ok(manifest.type, 'type is required');
      assert.match(manifest.type, /^(library|customer-facing)$/, 'type must be library or customer-facing');
    });
  }
});

test('Library distributions have no agents', async (t) => {
  for (const dir of skillDirs) {
    const manifestPath = join(skillsDir, dir, 'plugin.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
    
    if (manifest.type === 'library') {
      await t.test(`${dir} (library) has no agents`, () => {
        assert.ok(!manifest.agents || manifest.agents.length === 0,
          'Library distributions must not have agents');
      });
    }
  }
});
```

### 7. Install Dependencies

```bash
npm install
```

### 8. Initialize Git

```bash
git add .
git commit -m "chore: initialize forge dev repo"
```

## Creating Your First Skill: SKILL.md Format

Before creating a distribution, let's author a single agent skill using Forge's **SKILL.md format** — the portable Markdown-based convention for skill authoring.

### Understanding the Layers

When authoring an agent skill in Forge, you'll work with two complementary files:

1. **SKILL.md** — Portable, standalone skill documentation with optional resources
   - What the skill does and how to use it
   - Input/output specifications
   - Example usage and best practices
   - Can be understood independently, reused across distributions or platforms

2. **plugin.json** — Distribution manifest (created when packaging multiple skills)
   - Metadata: name, version, status, maintainer
   - Lists which skills, agents, and prompts are in this distribution
   - Specifies distribution type (library vs. customer-facing)
   - Used for packaging and release

**For a single skill:** Start with SKILL.md. Optionally add minimal plugin.json metadata when ready to publish.

### Step 1: Create Skill Directory

```bash
mkdir skills/my-first-skill
cd skills/my-first-skill
```

### Step 2: Create SKILL.md

This is the primary artifact for skill authoring. Create `SKILL.md` with this structure:

```markdown
---
name: "Skill Display Name"
description: "One-sentence description of what this skill does"
tags: ["tag1", "tag2"]
capabilities: ["what", "it", "enables"]
---

# My First Skill

## Overview

What this skill does and why it's useful. One or two paragraphs.

## What It Does

- Capability 1
- Capability 2
- Capability 3

## Usage Example

\`\`\`javascript
// How to use this skill
const result = await mySkill({ input: "value" });
console.log(result);
\`\`\`

## Input Schema

\`\`\`json
{
  "type": "object",
  "properties": {
    "parameter1": {
      "type": "string",
      "description": "Description of parameter"
    }
  },
  "required": ["parameter1"]
}
\`\`\`

## Output Schema

\`\`\`json
{
  "type": "object",
  "properties": {
    "result": {
      "type": "string",
      "description": "Result of the skill"
    }
  }
}
\`\`\`

## Best Practices

- Keep the skill focused on a single responsibility
- Document all inputs and outputs clearly
- Provide executable examples

## See Also

- [Related Skill 1](../related-skill-1/SKILL.md)
- [Framework Documentation](https://example.com)
```

### Step 3: Implement the Skill

Create `index.js`:

```javascript
export async function mySkill(input) {
  // Implementation
  return { result: "success" };
}

export const skillMetadata = {
  name: "My First Skill",
  description: "One-sentence description",
  inputSchema: { /* ... */ },
  outputSchema: { /* ... */ }
};
```

### Step 4: Add Supporting Files (Optional)

If your skill needs additional resources:

```
skills/my-first-skill/
├── SKILL.md              # Portable skill documentation
├── index.js              # Implementation
├── resources/
│   ├── template.txt      # Templates or configurations
│   └── helper-script.js  # Utility scripts
└── README.md             # (Optional) Additional user documentation
```

### Step 5: Test Locally

```bash
node --test index.js
```

This workflow keeps your skill self-contained and discoverable. When you're ready to **publish multiple skills as a distribution**, you'll add plugin.json as the packaging layer (see next section).

## Creating Your First Distribution: Excel MCP Server Example

This example creates a library distribution (skills-only) for Excel MCP Server automation, packaging multiple skills together.

### Step 1: Create Distribution Directory

```bash
mkdir skills/excel-mcp-server
cd skills/excel-mcp-server
```

### Step 2: Create Agent Skills

Each skill gets its own subdirectory with SKILL.md:

```
skills/excel-mcp-server/
├── skills/
│   ├── excel-file-ops/
│   │   ├── SKILL.md          # Skill documentation
│   │   ├── index.js          # Implementation
│   │   └── schema.json       # Tool schema
│   ├── excel-formatting/
│   │   ├── SKILL.md
│   │   ├── index.js
│   │   └── schema.json
│   └── power-query/
│       ├── SKILL.md
│       ├── index.js
│       └── schema.json
├── plugin.json               # Distribution manifest (next step)
├── package.json
└── README.md
```

Each skill should have its own SKILL.md file (see "Creating Your First Skill" section above for format).

### Step 3: Create plugin.json

```json
{
  "name": "excel-mcp-server",
  "version": "0.1.0",
  "type": "library",
  "description": "MCP server for automating Microsoft Excel operations on Windows",
  "homepage": "https://excelmcpserver.dev",
  "maintainer": {
    "name": "Your Team",
    "email": "your-team@org.com"
  },
  "status": "dev",
  "skills": [
    {
      "name": "readExcel",
      "description": "Read data from Excel workbooks and ranges"
    },
    {
      "name": "writeExcel",
      "description": "Write data to Excel workbooks, cells, and ranges"
    },
    {
      "name": "executeExcelFormula",
      "description": "Execute Excel formulas and retrieve results"
    },
    {
      "name": "createPivotTable",
      "description": "Create and configure Excel pivot tables"
    }
  ],
  "dependencies": {
    "excelmcpserver": "^1.0.0"
  },
  "tags": ["excel", "windows", "automation", "mcp"]
}
```

### Step 4: Validate

```bash
cd ../.. && npm run validate
```

This will check that plugin.json is well-formed and all required fields are present.

### Step 5: Build Registry

```bash
npm run build:skills
```

The `SKILLS.md` file will be regenerated, showing your skill in the library skills section.

### 5. Next Steps

- Add skill implementations in `skills/excel-mcp-server/skills/`
- Write tests for each skill
- Document usage examples
- When ready for publication: bump version to `1.0.0` and set status to `stable`
- Follow the release workflow in [FORGE.md](./FORGE.md#release-workflow)

### Why This Example Works With Forge

**Excel MCP Server is a library skill because:**
- It's a pure skills collection (no agents, no UI)
- Skills are stateless — each call is independent
- No APM required — workflows are simple
- Teams will wrap these skills in their own agents as needed
- Lean, focused, ready to use

**When APM would NOT be needed:** Excel MCP Server itself stays simple — complex agent behavior (error recovery, retry logic, multi-step workflows) belongs in the agents that consume these skills, not in the skill itself.

**When someone might add agents:** A team could create a *separate* customer-facing plugin (`excel-agent-automation`) that uses Excel MCP Server skills plus agent logic for complex automation workflows. That's a different plugin — Forge supports both.

## Next Steps

- See `docs/FORGE.md` for architectural decisions
- See `docs/PLUGIN_MANIFEST.md` for complete manifest schema
- See `excelmcpserver.dev` for Excel MCP Server implementation details
- Set up GitHub Actions for automated validation and release
- Prepare your published plugin repo or package release surface
