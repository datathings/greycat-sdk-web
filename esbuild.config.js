import * as esbuild from 'esbuild';

await Promise.all([
  // iife bundle
  esbuild.build({
    entryPoints: ['src/exports.ts'],
    outfile: './dist/greycat.js',
    bundle: true,
    globalName: 'greycat',
    format: 'iife',
    target: 'esnext',
    minifySyntax: true,
    minifyWhitespace: true,
    loader: {
      '.css': 'text',
      '.css?inline': 'text',
    },
    logLevel: 'info',
    external: ['maplibre-gl'],
  }),
  // esm bundle
  esbuild.build({
    entryPoints: ['src/index.ts'],
    outfile: './dist/greycat.esm.js',
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
    external: ['maplibre-gl'],
  }),
]);
