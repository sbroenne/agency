import fs from 'node:fs';
import path from 'node:path';
import { loadRegistry, repoRoot } from './lib/registry.mjs';

try {
  const registry = loadRegistry();
  const outputPath = path.join(repoRoot, 'public', 'squads.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(registry, null, 2)}\n`);
  console.log(`Built registry feed at ${path.relative(repoRoot, outputPath)}.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
