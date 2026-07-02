import { spawn } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';

const BIN = 'node_modules/.bin';

function run(name, cmd, args) {
  return new Promise((resolve, reject) => {
    const start = performance.now();
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        console.log(`${name}: ${((performance.now() - start) / 1000).toFixed(1)}s`);
        resolve();
      } else {
        reject(new Error(`${name}: exit code ${code}`));
      }
    });
  });
}

const tsc = (name, project) => run(name, `${BIN}/tsc`, ['-p', project]);
const node = (name, script) => run(name, process.execPath, [script]);
const lightningcss = (name) =>
  run(`css:${name}`, `${BIN}/lightningcss`, [
    '--minify',
    '--bundle',
    '--targets',
    '>=0.25%',
    `css/${name}.css`,
    '-o',
    `dist/${name}.css`,
  ]);

const jsx = () => tsc('jsx', 'src/jsx/tsconfig.json');
const sdk = async () => {
  await node('gen-wasm', 'scripts/gen-wasm.js');
  rmSync('dist/sdk', { recursive: true, force: true });
  await tsc('sdk', 'src/sdk/tsconfig.json');
  await node('sdk-dts', 'scripts/build-dts.js');
};
const webTsc = () => tsc('web', 'src/web/tsconfig.json');
const webRollup = () => run('web-rollup', `${BIN}/rollup`, ['-c', 'rollup.web.js']);
const vitePlugin = () => tsc('vite-plugin', 'src/vite-plugin/tsconfig.json');
const css = () => {
  mkdirSync('dist', { recursive: true });
  return Promise.all([lightningcss('greycat'), lightningcss('greycat-full')]);
};

const steps = {
  jsx,
  sdk,
  web: () => {
    rmSync('dist/web', { recursive: true, force: true });
    return Promise.all([webTsc(), webRollup()]);
  },
  'vite-plugin': vitePlugin,
  css,
};

// Everything runs concurrently except the web type-check, which needs the
// dist/jsx and dist/sdk type declarations
async function buildAll() {
  const start = performance.now();
  rmSync('dist/web', { recursive: true, force: true });
  mkdirSync('dist', { recursive: true });
  const jsxDone = jsx();
  const sdkDone = sdk();
  const results = await Promise.allSettled([
    jsxDone,
    sdkDone,
    Promise.all([jsxDone, sdkDone]).then(webTsc),
    webRollup(),
    vitePlugin(),
    css(),
  ]);
  const failures = new Set(
    results.filter((r) => r.status === 'rejected').map((r) => r.reason.message ?? String(r.reason)),
  );
  if (failures.size > 0) {
    for (const failure of failures) {
      console.error(failure);
    }
    process.exit(1);
  }
  console.log(`total: ${((performance.now() - start) / 1000).toFixed(1)}s`);
}

const step = process.argv[2];
if (step === undefined) {
  await buildAll();
} else if (step in steps) {
  try {
    await steps[step]();
  } catch (err) {
    console.error(err.message ?? String(err));
    process.exit(1);
  }
} else {
  console.error(`unknown build step '${step}' (expected: ${Object.keys(steps).join(', ')})`);
  process.exit(1);
}
