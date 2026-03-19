import { loadRegistry } from './lib/registry.mjs';

try {
  const registry = loadRegistry();
  console.log(`Validated ${registry.counts.squads} squad manifest(s).`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
