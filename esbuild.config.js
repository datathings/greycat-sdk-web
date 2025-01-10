import { buildSync } from 'esbuild';

// iife bundle
buildSync({
  entryPoints: ['src/web/index.ts'],
  outfile: './dist/greycat.web.js',
  bundle: true,
  format: 'iife',
  target: 'esnext',
  globalName: 'greycat',
  minifySyntax: true,
  minifyWhitespace: true,
  loader: {
    '.css': 'text',
    '.css?inline': 'text',
  },
  logLevel: 'info',
});

// esm bundle
buildSync({
  entryPoints: ['src/web/index.ts'],
  outfile: './dist/greycat.web.esm.js',
  bundle: true,
  format: 'esm',
  target: 'esnext',
  sourcemap: true,
  minifySyntax: true,
  minifyWhitespace: true,
  loader: {
    '.css': 'text',
    '.css?inline': 'text',
  },
  logLevel: 'info',
});
