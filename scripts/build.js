// @ts-check
import path from 'node:path';
import * as esbuild from 'esbuild';

/** @type {esbuild.BuildOptions} */
const base = {
  logLevel: 'info',
  entryPoints: [path.join('src', 'index.ts')],
  bundle: true,
  keepNames: true,
  allowOverwrite: true,
  loader: {
    '.css': 'text',
    '.css?inline': 'text',
  },
};

await Promise.allSettled([
  esbuild.build({
    ...base,
    outfile: path.join('dist', 'greycat.js'),
    format: 'esm',
  }),
  esbuild.build({
    ...base,
    outfile: path.join('dist', 'greycat.min.js'),
    format: 'esm',
    minify: true,
  }),
  esbuild.build({
    ...base,
    outfile: path.join('dist', 'greycat.iife.min.js'),
    format: 'iife',
    minify: true,
  }),
]);
