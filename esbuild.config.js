import { buildSync } from 'esbuild';

const minify = false;
const loaders = {
  '.css': 'text',
  '.css?inline': 'text',
  '.svg': 'text',
  '.svg?raw': 'text',
};
const external = ['maplibre-gl'];

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
  external,
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
  external,
  loader: loaders,
  logLevel: 'info',
});
