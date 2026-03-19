import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const candidateRepoRoots = [
  process.cwd(),
  path.resolve(__dirname, '..', '..', '..'),
  path.resolve(__dirname, '..', '..'),
];

export const repoRoot =
  candidateRepoRoots.find((candidate) => fs.existsSync(path.join(candidate, 'package.json'))) ?? process.cwd();
function resolveRegistryPaths(options = {}) {
  const rootPath = options.repoRoot ?? repoRoot;

  return {
    repoRoot: rootPath,
    schemaPath: options.schemaPath ?? path.join(rootPath, 'tooling', 'schema', 'squad.schema.json'),
    squadsRoot: options.squadsRoot ?? path.join(rootPath, 'squads'),
  };
}

export function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function createValidator(options = {}) {
  const { schemaPath } = resolveRegistryPaths(options);
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  return ajv.compile(readJson(schemaPath));
}

export function listManifestPaths(options = {}) {
  const { squadsRoot } = resolveRegistryPaths(options);
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

function ensureUnique(values, label, errors, filePath, rootPath) {
  const seen = new Set();
  for (const value of values) {
    const key = String(value).toLowerCase();
    if (seen.has(key)) {
      errors.push(`${path.relative(rootPath, filePath)}: duplicate ${label} value "${value}"`);
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

function deriveSourceLabel(repository) {
  const repoUrl = new URL(repository);
  const repoPath = repoUrl.pathname.replace(/^\/+|\/+$/g, '');

  if (/^www\./i.test(repoUrl.hostname)) {
    repoUrl.hostname = repoUrl.hostname.replace(/^www\./i, '');
  }

  if (repoUrl.hostname.toLowerCase() === 'github.com') {
    return repoPath;
  }

  return repoPath ? `${repoUrl.hostname}/${repoPath}` : repoUrl.hostname;
}

function validateRelativePath(value, label, errors, manifestPath, rootPath) {
  const normalizedValue = value.replaceAll('\\', '/');

  if (path.posix.isAbsolute(normalizedValue)) {
    errors.push(`${path.relative(rootPath, manifestPath)}: ${label} must be relative, received "${value}"`);
    return;
  }

  const normalizedPath = path.posix.normalize(normalizedValue);
  if (normalizedPath === '..' || normalizedPath.startsWith('../')) {
    errors.push(`${path.relative(rootPath, manifestPath)}: ${label} must stay within the repository, received "${value}"`);
  }
}

function validateUrl(value, label, errors, manifestPath, rootPath, { requireRepositoryPath = false } = {}) {
  let parsedUrl;

  try {
    parsedUrl = new URL(value);
  } catch {
    errors.push(`${path.relative(rootPath, manifestPath)}: ${label} must be a valid URL`);
    return;
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    errors.push(`${path.relative(rootPath, manifestPath)}: ${label} must use http or https, received "${value}"`);
  }

  if (requireRepositoryPath) {
    const segments = parsedUrl.pathname.split('/').filter(Boolean);
    if (segments.length < 2) {
      errors.push(
        `${path.relative(rootPath, manifestPath)}: ${label} must include an owner and repository path, received "${value}"`,
      );
    }
  }
}

function validateManifestSemantics(manifest, manifestPath, errors, rootPath) {
  validateUrl(manifest.source.repository, 'source.repository', errors, manifestPath, rootPath, {
    requireRepositoryPath: true,
  });

  if (manifest.source.homepage) {
    validateUrl(manifest.source.homepage, 'source.homepage', errors, manifestPath, rootPath);
  }

  validateRelativePath(manifest.source.directory, 'source.directory', errors, manifestPath, rootPath);

  if (manifest.source.import?.path) {
    validateRelativePath(manifest.source.import.path, 'source.import.path', errors, manifestPath, rootPath);
  }
}

function normalizeManifest(manifest, manifestPath, rootPath) {
  return {
    id: manifest.id,
    slug: manifest.slug,
    name: manifest.name,
    status: manifest.status,
    sourceLabel: deriveSourceLabel(manifest.source.repository),
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
      manifestPath: path.relative(rootPath, manifestPath),
    },
  };
}

export function loadRegistry(options = {}) {
  const { repoRoot: rootPath } = resolveRegistryPaths(options);
  const validate = createValidator(options);
  const manifestPaths = listManifestPaths(options);
  const errors = [];
  const manifests = [];
  const ids = new Map();
  const slugs = new Map();

  for (const manifestPath of manifestPaths) {
    let manifest;

    try {
      manifest = readJson(manifestPath);
    } catch (error) {
      errors.push(`${path.relative(rootPath, manifestPath)}: invalid JSON (${error.message})`);
      continue;
    }

    const valid = validate(manifest);
    if (!valid) {
      for (const detail of formatAjvErrors(validate.errors)) {
        errors.push(`${path.relative(rootPath, manifestPath)}: ${detail}`);
      }
      continue;
    }

    validateManifestSemantics(manifest, manifestPath, errors, rootPath);

    const folderName = path.basename(path.dirname(manifestPath));
    if (manifest.slug !== folderName) {
      errors.push(
        `${path.relative(rootPath, manifestPath)}: slug "${manifest.slug}" must match directory name "${folderName}"`,
      );
    }

    ensureUnique(manifest.focus, 'focus', errors, manifestPath, rootPath);
    for (const member of manifest.team.members) {
      ensureUnique(member.expertise, `expertise for member ${member.name}`, errors, manifestPath, rootPath);
    }

    if (ids.has(manifest.id)) {
      errors.push(
        `${path.relative(rootPath, manifestPath)}: id "${manifest.id}" already used by ${ids.get(manifest.id)}`,
      );
    } else {
      ids.set(manifest.id, path.relative(rootPath, manifestPath));
    }

    if (slugs.has(manifest.slug)) {
      errors.push(
        `${path.relative(rootPath, manifestPath)}: slug "${manifest.slug}" already used by ${slugs.get(manifest.slug)}`,
      );
    } else {
      slugs.set(manifest.slug, path.relative(rootPath, manifestPath));
    }

    manifests.push({ manifest, manifestPath });
  }

  if (errors.length > 0) {
    const validationError = new Error(`Registry validation failed:\n${errors.join('\n')}`);
    validationError.validationErrors = errors;
    throw validationError;
  }

  const squads = manifests
    .map(({ manifest, manifestPath }) => normalizeManifest(manifest, manifestPath, rootPath))
    .sort((left, right) => left.name.localeCompare(right.name));

  const memberCount = squads.reduce((total, squad) => total + squad.members.length, 0);
  const focusAreas = new Set(squads.flatMap((squad) => squad.focus.map((entry) => entry.toLowerCase())));

  return {
    generatedAt: options.now?.() ?? new Date().toISOString(),
    counts: {
      squads: squads.length,
      members: memberCount,
      focusAreas: focusAreas.size,
    },
    squads,
  };
}
