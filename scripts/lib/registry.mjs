import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const repoRoot = path.resolve(__dirname, '..', '..');
const schemaPath = path.join(repoRoot, 'schema', 'squad.schema.json');
const squadsRoot = path.join(repoRoot, 'squads');

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function createValidator() {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  return ajv.compile(readJson(schemaPath));
}

export function listManifestPaths() {
  if (!fs.existsSync(squadsRoot)) {
    return [];
  }

  return fs
    .readdirSync(squadsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(squadsRoot, entry.name, 'squad.json'))
    .filter((manifestPath) => fs.existsSync(manifestPath))
    .sort((left, right) => left.localeCompare(right));
}

function formatAjvErrors(errors = []) {
  return errors.map((error) => {
    const where = error.instancePath || '/';
    return `${where} ${error.message}`.trim();
  });
}

function ensureUnique(values, label, errors, filePath) {
  const seen = new Set();
  for (const value of values) {
    const key = String(value).toLowerCase();
    if (seen.has(key)) {
      errors.push(`${path.relative(repoRoot, filePath)}: duplicate ${label} value "${value}"`);
    }
    seen.add(key);
  }
}

function deriveLinks(manifest) {
  const links = [];
  const known = new Set();

  const addLink = (label, url) => {
    if (!url || known.has(url)) {
      return;
    }
    known.add(url);
    links.push({ label, url });
  };

  addLink('Repository', manifest.source.repository);
  addLink('Homepage', manifest.source.homepage);
  for (const link of manifest.links ?? []) {
    addLink(link.label, link.url);
  }

  return links;
}

function normalizeManifest(manifest, manifestPath) {
  const repoUrl = new URL(manifest.source.repository);
  const repoLabel = repoUrl.pathname.replace(/^\//, '');

  return {
    id: manifest.id,
    slug: manifest.slug,
    name: manifest.name,
    status: manifest.status,
    sourceLabel: repoLabel,
    location: manifest.source.directory,
    tagline: manifest.tagline,
    summary: manifest.summary,
    howTheyWork: manifest.mission,
    focus: [...manifest.focus].sort((left, right) => left.localeCompare(right)),
    links: deriveLinks(manifest),
    members: manifest.team.members.map((member) => ({
      name: member.name,
      role: member.role,
      expertise: [...member.expertise].sort((left, right) => left.localeCompare(right)),
      github: member.github ?? null,
    })),
    source: {
      repository: manifest.source.repository,
      directory: manifest.source.directory,
      homepage: manifest.source.homepage ?? null,
      import: manifest.source.import ?? null,
      manifestPath: path.relative(repoRoot, manifestPath),
    },
  };
}

export function loadRegistry() {
  const validate = createValidator();
  const manifestPaths = listManifestPaths();
  const errors = [];
  const manifests = [];
  const ids = new Map();
  const slugs = new Map();

  for (const manifestPath of manifestPaths) {
    let manifest;

    try {
      manifest = readJson(manifestPath);
    } catch (error) {
      errors.push(`${path.relative(repoRoot, manifestPath)}: invalid JSON (${error.message})`);
      continue;
    }

    const valid = validate(manifest);
    if (!valid) {
      for (const detail of formatAjvErrors(validate.errors)) {
        errors.push(`${path.relative(repoRoot, manifestPath)}: ${detail}`);
      }
      continue;
    }

    const folderName = path.basename(path.dirname(manifestPath));
    if (manifest.slug !== folderName) {
      errors.push(
        `${path.relative(repoRoot, manifestPath)}: slug "${manifest.slug}" must match directory name "${folderName}"`,
      );
    }

    ensureUnique(manifest.focus, 'focus', errors, manifestPath);
    for (const member of manifest.team.members) {
      ensureUnique(member.expertise, `expertise for member ${member.name}`, errors, manifestPath);
    }

    if (ids.has(manifest.id)) {
      errors.push(
        `${path.relative(repoRoot, manifestPath)}: id "${manifest.id}" already used by ${ids.get(manifest.id)}`,
      );
    } else {
      ids.set(manifest.id, path.relative(repoRoot, manifestPath));
    }

    if (slugs.has(manifest.slug)) {
      errors.push(
        `${path.relative(repoRoot, manifestPath)}: slug "${manifest.slug}" already used by ${slugs.get(manifest.slug)}`,
      );
    } else {
      slugs.set(manifest.slug, path.relative(repoRoot, manifestPath));
    }

    manifests.push({ manifest, manifestPath });
  }

  if (errors.length > 0) {
    const validationError = new Error(`Registry validation failed:\n${errors.join('\n')}`);
    validationError.validationErrors = errors;
    throw validationError;
  }

  const squads = manifests
    .map(({ manifest, manifestPath }) => normalizeManifest(manifest, manifestPath))
    .sort((left, right) => left.name.localeCompare(right.name));

  const memberCount = squads.reduce((total, squad) => total + squad.members.length, 0);
  const focusAreas = new Set(squads.flatMap((squad) => squad.focus.map((entry) => entry.toLowerCase())));

  return {
    generatedAt: new Date().toISOString(),
    counts: {
      squads: squads.length,
      members: memberCount,
      focusAreas: focusAreas.size,
    },
    squads,
  };
}
