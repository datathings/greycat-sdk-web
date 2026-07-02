import { copyFileSync, existsSync, mkdirSync } from 'node:fs';

const WASM_PATH = 'webroot/std/greycat.wasm';
const OUTPUT_PATH = 'dist/greycat.wasm';

if (!existsSync(WASM_PATH)) {
  throw new Error(`Missing wasm file: ${WASM_PATH}`);
}
mkdirSync('dist', { recursive: true });
copyFileSync(WASM_PATH, OUTPUT_PATH);
