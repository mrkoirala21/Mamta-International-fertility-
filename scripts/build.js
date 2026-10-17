import { rmSync, existsSync, cpSync, mkdirSync } from 'node:fs';
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

if (result.status === 0) {
  try {
    const distDir = resolve(process.cwd(), 'dist');
    const publicDir = resolve(process.cwd(), 'public');
    const srcImagesDir = resolve(process.cwd(), 'src/assets/images');

    // Ensure dist/assets exists and includes all images
    const distAssets = resolve(distDir, 'assets');
    mkdirSync(distAssets, { recursive: true });
    if (existsSync(resolve(publicDir, 'assets'))) {
      cpSync(resolve(publicDir, 'assets'), distAssets, { recursive: true });
    }

    // Ensure dist/images exists
    const distImages = resolve(distDir, 'images');
    mkdirSync(distImages, { recursive: true });
    if (existsSync(resolve(publicDir, 'images'))) {
      cpSync(resolve(publicDir, 'images'), distImages, { recursive: true });
    }

    // Ensure dist/src/assets/images exists for legacy paths
    const distSrcAssetsImages = resolve(distDir, 'src/assets/images');
    mkdirSync(distSrcAssetsImages, { recursive: true });
    if (existsSync(srcImagesDir)) {
      cpSync(srcImagesDir, distSrcAssetsImages, { recursive: true });
    }
  } catch (err) {
    console.error('Post-build asset copy warning:', err);
  }
}

process.exit(result.status ?? 0);

