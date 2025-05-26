import { dts } from 'rollup-plugin-dts';

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/web/index.ts',
    output: {
      file: 'dist/greycat-web.d.ts',
      format: 'esm',
      banner: `declare module '@greycat/web' {\nimport '@greycat/web/sdk';\n`,
      footer: [
        `}\n`,
        `declare global {`,
        `  namespace gc {`,
        `    const web: typeof import('@greycat/web');`,
        `  }`,
        `}`,
      ].join('\n'),
    },
    plugins: [
      dts({
        tsconfig: 'src/web/tsconfig.json',
      }),
    ],
    external: ['@greycat/web/sdk'],
  },
];
export default config;
