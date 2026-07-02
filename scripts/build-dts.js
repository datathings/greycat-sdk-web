import { copyFileSync, writeFileSync } from 'node:fs';
import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

// std type declarations referenced by dist/sdk/index.d.ts
copyFileSync('std.d.ts', 'dist/sdk/std.d.ts');
copyFileSync('std.ext.d.ts', 'dist/sdk/std.ext.d.ts');

// Bundle the per-module declarations into a single flat .d.ts
const bundle = await rollup({ input: 'dist/sdk/lib/index.d.ts', plugins: [dts()] });
const { output } = await bundle.generate({ format: 'es' });
await bundle.close();
let code = output[0].code;

// Pull out the polyfill's `declare global { ... }` block; its members become
// top-level (global) declarations of the generated script
const globals = [];
code = code.replace(/^declare global \{\n([\s\S]*?)\n\}\n/m, (_, body) => {
  globals.push(body.replace(/^ {4}/gm, '').replace(/\$type\?: AbiType/g, '$type?: gc.sdk.AbiType'));
  return '';
});

// Pull out the module export lists; they become the namespace export lists
const exportLists = [];
code = code.replace(/^export (?:type )?\{([\s\S]*?)\};\n/gm, (_, names) => {
  exportLists.push(`export {${names}};`);
  return '';
});

// Top-level declarations do not need `declare` inside an ambient namespace
code = code.replace(/^declare /gm, '');

const globalDts = `// AUTO-GENERATED FILE PLEASE DO NOT MODIFY MANUALLY
// Global view of the '@greycat/web/sdk' module (see dist/sdk/index.d.ts).
${globals.join('\n')}
declare namespace gc {
  /**
   * A map of all known GreyCat instances allowing to communicate with different GreyCat instances from the same client.
   *
   * *The name \`'default'\` is reserved and is used when initializing without a specific name*.
   */
  const $: { [name: string]: sdk.GreyCat };
  namespace sdk {
${code}
${exportLists.join('\n')}
  }
}
`;
writeFileSync('dist/sdk/gc-global.d.ts', globalDts);

// Names for the module entry aliases, from the bundle's own export lists
const aliases = exportLists
  .flatMap((l) => l.replace(/^export \{|\};$/g, '').split(','))
  .map((n) => n.trim())
  .filter((n) => n.length > 0)
  .map((n) => {
    const m = n.match(/ as (.+)$/);
    return m ? m[1] : n;
  })
  .sort()
  .map((n) => `export import ${n} = gc.sdk.${n};`);

// '@greycat/web/sdk' entry: same declarations as the global `gc.sdk` namespace,
// exposed as module exports
writeFileSync(
  'dist/sdk/index.d.ts',
  `/// <reference path="./std.d.ts" />
/// <reference path="./std.ext.d.ts" />
/// <reference path="./gc-global.d.ts" />
${aliases.join('\n')}
`,
);
writeFileSync('dist/sdk/index.js', `export * from './lib/global.js';\n`);
