# Plugin Manifest Schema

The `plugin.json` manifest describes a Forge plugin's metadata, capabilities, and publishing details.

## Terminology Note

This `plugin.json` is for **Forge plugins**. It is not the VS Code extension `package.json` format, and it is not a GitHub CLI extension package definition. Agent Skills remain separate reusable units that can be referenced inside a Forge plugin.

## Schema Definition

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Squad Plugin Manifest",
  "type": "object",
  "required": ["name", "version", "description", "type"],
  "properties": {
    "name": {
      "type": "string",
      "description": "Unique plugin identifier (e.g., 'code-reviewer', 'json-formatter')",
      "pattern": "^[a-z0-9]([a-z0-9-]*[a-z0-9])?$"
    },
    "version": {
      "type": "string",
      "description": "Semantic version (e.g., '1.0.0')",
      "pattern": "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$"
    },
    "type": {
      "type": "string",
      "enum": ["library", "customer-facing"],
      "description": "Plugin type: library (skills only) or customer-facing (agents + prompts)"
    },
    "description": {
      "type": "string",
      "description": "Short description of plugin functionality"
    },
    "homepage": {
      "type": "string",
      "format": "uri",
      "description": "Plugin repository or documentation URL"
    },
    "maintainer": {
      "type": "object",
      "required": ["name", "email"],
      "properties": {
        "name": {
          "type": "string",
          "description": "Maintainer name"
        },
        "email": {
          "type": "string",
          "format": "email",
          "description": "Maintainer email"
        }
      }
    },
    "status": {
      "type": "string",
      "enum": ["dev", "beta", "stable", "deprecated"],
      "default": "dev",
      "description": "Plugin maturity status"
    },
    "skills": {
      "type": "array",
      "description": "List of exported skills",
      "items": {
        "type": "object",
        "required": ["name", "description"],
        "properties": {
          "name": {
            "type": "string",
            "description": "Skill identifier"
          },
          "description": {
            "type": "string",
            "description": "What this skill does"
          },
          "inputs": {
            "type": "object",
            "description": "Input schema (JSON Schema)"
          },
          "outputs": {
            "type": "object",
            "description": "Output schema (JSON Schema)"
          }
        }
      }
    },
    "agents": {
      "type": "array",
      "description": "List of exported agents (customer-facing plugins only)",
      "items": {
        "type": "object",
        "required": ["name", "description"],
        "properties": {
          "name": {
            "type": "string",
            "description": "Agent identifier"
          },
          "description": {
            "type": "string",
            "description": "What this agent does"
          },
          "capabilities": {
            "type": "array",
            "description": "List of capabilities (skills this agent uses)",
            "items": {
              "type": "string"
            }
          }
        }
      }
    },
    "dependencies": {
      "type": "object",
      "description": "Required npm packages and versions",
      "additionalProperties": {
        "type": "string"
      }
    },
    "published": {
      "type": "object",
      "description": "Publishing metadata",
      "properties": {
        "registry": {
          "type": "string",
          "enum": ["npm", "github-releases", "internal"],
          "description": "Publishing registry"
        },
        "package": {
          "type": "string",
          "description": "Published package name (e.g., '@myorg/plugin-name')"
        },
        "url": {
          "type": "string",
          "format": "uri",
          "description": "Direct URL to published package"
        },
        "releaseDate": {
          "type": "string",
          "format": "date-time",
          "description": "ISO 8601 release timestamp"
        }
      }
    },
    "tags": {
      "type": "array",
      "description": "Category tags (e.g., 'code-review', 'documentation', 'testing')",
      "items": {
        "type": "string"
      }
    },
    "changelog": {
      "type": "string",
      "description": "Relative path to CHANGELOG.md (default: 'CHANGELOG.md')"
    }
  }
}
```

## Example: Library Plugin (Excel MCP Server)

```json
{
  "name": "excel-mcp-server",
  "version": "1.0.0",
  "type": "library",
  "description": "MCP server for automating Microsoft Excel operations on Windows",
  "homepage": "https://excelmcpserver.dev",
  "maintainer": {
    "name": "Platform Team",
    "email": "platform@myorg.com"
  },
  "status": "stable",
  "skills": [
    {
      "name": "readExcel",
      "description": "Read data from Excel workbooks and ranges",
      "inputs": {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string",
            "description": "Path to Excel file"
          },
          "sheetName": {
            "type": "string",
            "description": "Worksheet name"
          },
          "range": {
            "type": "string",
            "description": "Cell range (e.g., A1:B10)"
          }
        }
      },
      "outputs": {
        "type": "object",
        "properties": {
          "data": {
            "type": "array",
            "description": "Data from the range"
          }
        }
      }
    },
    {
      "name": "writeExcel",
      "description": "Write data to Excel workbooks and ranges",
      "inputs": {
        "type": "object",
        "properties": {
          "filePath": {
            "type": "string"
          },
          "sheetName": {
            "type": "string"
          },
          "range": {
            "type": "string"
          },
          "data": {
            "type": "array"
          }
        }
      }
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

## Example: Library Plugin (Generic Alternative: JSON Formatter)

```json
{
  "name": "skill-json-formatter",
  "version": "1.0.0",
  "type": "library",
  "description": "Validates and formats JSON with configurable indentation",
  "homepage": "https://github.com/myorg/forge-plugins/tree/main/plugins/skill-json-formatter",
  "maintainer": {
    "name": "Alice Team",
    "email": "alice@myorg.com"
  },
  "status": "stable",
  "skills": [
    {
      "name": "formatJson",
      "description": "Formats JSON string with indentation",
      "inputs": {
        "type": "object",
        "properties": {
          "json": {
            "type": "string",
            "description": "JSON string to format"
          },
          "indent": {
            "type": "number",
            "default": 2,
            "description": "Indentation spaces"
          }
        }
      },
      "outputs": {
        "type": "object",
        "properties": {
          "formatted": {
            "type": "string",
            "description": "Formatted JSON"
          }
        }
      }
    },
    {
      "name": "validateJson",
      "description": "Validates JSON syntax",
      "inputs": {
        "type": "object",
        "properties": {
          "json": {
            "type": "string"
          }
        }
      },
      "outputs": {
        "type": "object",
        "properties": {
          "valid": {
            "type": "boolean"
          },
          "error": {
            "type": "string"
          }
        }
      }
    }
  ],
  "dependencies": {},
  "tags": ["json", "formatting", "utility"]
}
```

## Example: Customer-Facing Plugin

```json
{
  "name": "agent-code-reviewer",
  "version": "2.1.0",
  "type": "customer-facing",
  "description": "AI code review agent with PR feedback and suggestions",
  "homepage": "https://github.com/myorg/forge-plugins/tree/main/plugins/agent-code-reviewer",
  "maintainer": {
    "name": "Dev Tools Team",
    "email": "devtools@myorg.com"
  },
  "status": "stable",
  "skills": [
    {
      "name": "analyzeCode",
      "description": "Analyzes code for style, security, and performance issues"
    },
    {
      "name": "generateFeedback",
      "description": "Generates human-readable feedback from analysis"
    }
  ],
  "agents": [
    {
      "name": "codeReviewer",
      "description": "Reviews pull requests and provides structured feedback",
      "capabilities": ["analyzeCode", "generateFeedback"]
    }
  ],
  "dependencies": {
    "@copilot/cli": "^1.0.0"
  },
  "published": {
    "registry": "npm",
    "package": "@myorg/agent-code-reviewer",
    "url": "https://www.npmjs.com/package/@myorg/agent-code-reviewer",
    "releaseDate": "2026-03-20T15:30:00Z"
  },
  "tags": ["code-review", "ci-cd", "github"]
}
```

## Validation Rules

1. **Name**: kebab-case, 3–50 chars
2. **Version**: Must follow semver (X.Y.Z)
3. **Type**: Must be `library` or `customer-facing`
4. **Status**: Valid values are `dev`, `beta`, `stable`, `deprecated`
5. **Library plugins**: No `agents` or `prompts` allowed
6. **Customer-facing plugins**: Must have at least one skill and one agent
7. **Published field**: Required if status is `stable`

## Extending the Schema

Teams can extend this schema with org-specific fields under a `_custom` namespace:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "type": "library",
  ...
  "_custom": {
    "internalTeam": "Platform",
    "costCenter": "ENGR-001",
    "apmRequired": false
  }
}
```
