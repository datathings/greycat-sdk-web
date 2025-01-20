// Outputs the missing sourcemapped files
import fs from 'node:fs';
import path from 'node:path';

const map_raw = fs.readFileSync('dist/greycat.web.esm.js.map', 'utf-8');
const map = JSON.parse(map_raw);

const sources = map.sources.map((relpath) => path.resolve('dist', relpath));

const missing = [];

for (const filepath of sources) {
  try {
    fs.statSync(filepath).isFile();
  } catch {
    missing.push(filepath);
  }
}

console.log(missing);
