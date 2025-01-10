import { buildSync } from 'esbuild';

buildSync({
  entryPoints: ['./dist/greycat.js'],
  outfile: './dist/greycat.js',
  bundle: true,
  format: 'iife',
  target: 'esnext',
  allowOverwrite: true,
  sourcemap: true,
  minifySyntax: true,
  minifyWhitespace: true,
  logLevel: 'info'
});
