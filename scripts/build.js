import { rmSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

// Handle --no-cache flag: explicitly clear Vite cache directory and dist
if (process.argv.includes('--no-cache')) {
  const viteCache = resolve(process.cwd(), 'node_modules/.vite');
  if (existsSync(viteCache)) {
    try {
      rmSync(viteCache, { recursive: true, force: true });
    } catch {}
  }
}

// Filter out --no-cache before delegating to vite build so CAC parser does not throw unknown option error
const filteredArgs = process.argv.slice(2).filter((arg) => arg !== '--no-cache');

const result = spawnSync('npx', ['vite', 'build', ...filteredArgs], {
  stdio: 'inherit',
  shell: true,
});

process.exit(result.status ?? 0);
