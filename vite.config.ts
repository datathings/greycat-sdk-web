import { readdirSync } from 'fs';
import { basename, extname, resolve } from 'path';
import { defineConfig } from 'vite';

const input_dir = 'pages';
const input = {
  index: resolve(__dirname, 'index.html'),
};
readdirSync(input_dir).forEach((file) => {
  if (file.endsWith('.html')) {
    const filename = basename(file);
    const extensionless = filename.slice(0, -extname(filename).length);
    input[extensionless] = resolve(__dirname, input_dir, file);
  }
});

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input,
    },
  },
});
