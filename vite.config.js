import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    minifyIdentifiers: false,
    minifySyntax: true,
    minifyWhitespace: true,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/exports.ts'),
      name: 'greycat',
      formats: ['iife', 'es'],
      fileName: (format) => {
        if (format === 'es') {
          return 'greycat.esm.js';
        }
        return 'greycat.js';
      },
    },
    minify: 'esbuild',
    emptyOutDir: false,
  },
});
