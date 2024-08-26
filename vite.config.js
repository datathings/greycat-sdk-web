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
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: '[name]',
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.ts'),
      },
      output: {
        preserveModules: true, // Preserve module directory structure
        dir: 'dist/esm', // Output directory
        entryFileNames: '[name].js', // Keep file names consistent
        assetFileNames: '[name][extname]', // Keep original asset file names
      },
    },
    minify: 'esbuild',
    emptyOutDir: false,
  },
});
