import { readdirSync, statSync } from 'fs';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '',
  appType: 'mpa',
  root: resolve(__dirname, 'pages'),
  build: {
    outDir: resolve(__dirname, 'dist', 'pages'),
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: (() => {
        const PAGES_DIR = resolve(__dirname, 'pages');
        const input = {};

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

        return input;
      })(),
    },
  },
});
