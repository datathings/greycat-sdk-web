import { readdirSync, statSync } from 'fs';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';

const PAGES_DIR = 'pages';
const input = {
  index: resolve(__dirname, 'index.html'),
};

function readdir(path: string) {
  readdirSync(path).forEach((entry) => handleEntry(resolve(__dirname, path, entry)));
}

function handleEntry(path: string) {
  if (path.endsWith('.html')) {
    const relativePath = relative(PAGES_DIR, path);
    const entryName = relativePath.slice(0, -extname(relativePath).length);
    input[entryName] = path;
  } else if (isDir(path)) {
    readdir(path);
  }
}

function isDir(path: string) {
  return statSync(path).isDirectory();
}

readdir(PAGES_DIR);

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input,
    },
  },
});
