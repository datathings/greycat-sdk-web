import { buildSync } from 'esbuild';

const minify = true;
const loaders = {
  '.css': 'text',
  '.css?inline': 'text',
  '.svg': 'text',
  '.svg?raw': 'text',
};

// iife bundle
buildSync({
  entryPoints: ['src/web/index.ts'],
  outfile: './dist/greycat.web.js',
  bundle: true,
  format: 'iife',
  target: 'esnext',
  globalName: 'greycat',
  minifySyntax: minify,
  minifyWhitespace: minify,
  loader: loaders,
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
  sourcesContent: false,
  minifySyntax: minify,
  minifyWhitespace: minify,
  loader: loaders,
  logLevel: 'info',
});
