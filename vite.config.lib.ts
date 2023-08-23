import { resolve } from 'node:path'

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ['src'],
    }),
  ],
  build: {
    minify: true,
    cssMinify: true,
    outDir: resolve(__dirname, 'dist', 'esm'),
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'greycat',
      formats: ['es'],
      fileName: 'index',
    },
  },
});