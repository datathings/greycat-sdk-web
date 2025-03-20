/**
 * This script should be used with: 'pnpm build:vendor'
 *
 * You are supposed to run that on your dev machine everytime
 * one of the re-exported dependency is changed.
 *
 * BEWARE that this take 4 minutes on my machine and takes up to 12GB of RAM.
 * This is not a joke, even if it sounds like it is..
 * The reason is that 'rollup-plugin-dts' compiles stuff in-mem rather than
 * outputting to file directly. Pretty sure it is a wrongful usage of the
 * TypeScript compiler API but it works, so, all good.
 */

import { dts } from 'rollup-plugin-dts';

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/vendor/shoelace.ts',
    output: {
      file: 'vendor/shoelace.d.ts',
      format: 'es',
      banner: `declare module '@shoelace-style/shoelace' {`,
      footer: '}',
    },
    plugins: [dts({ respectExternal: true })],
    external: ['lit-html'],
  },
  {
    input: 'src/vendor/lit-html.ts',
    output: {
      file: 'vendor/lit-html.d.ts',
      format: 'es',
      banner: `declare module 'lit-html' {`,
      footer: '}',
    },
    plugins: [dts({ respectExternal: true })],
    external: [],
  },
  {
    input: 'src/vendor/d3.ts',
    output: {
      file: 'vendor/d3.d.ts',
      format: 'es',
      banner: `declare module 'd3' {`,
      footer: '}',
    },
    plugins: [dts({ respectExternal: true })],
    external: [],
  },
  {
    input: 'src/vendor/dockview.ts',
    output: {
      file: 'vendor/dockview.d.ts',
      format: 'es',
      banner: `declare module 'dockview-core' {`,
      footer: '}',
    },
    plugins: [dts({ respectExternal: true })],
    external: [],
  },
];
export default config;
