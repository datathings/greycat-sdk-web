import { buildSync } from 'esbuild';
import { writeFileSync } from 'node:fs';

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

const withMeta = Boolean(process.env.META);

// esm bundle
const out = buildSync({
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
  metafile: withMeta,
  logLevel: 'info',
});

if (withMeta) {
  writeFileSync('meta.json', JSON.stringify(out.metafile));
}
