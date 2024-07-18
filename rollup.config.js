import dts from 'rollup-plugin-dts';

export default {
  input: './dist/esm/exports.d.ts',
  output: {
    file: './dist/greycat.d.ts',
    format: 'iife',
    name: 'greycat',
  },
  plugins: [dts({ respectExternal: true })],
};
