import { inspect } from 'node:util';
import '@greycat/web/sdk';

await gc.sdk.init();

const root = new gc.io.File('/', null, null);
await root.resolve();

console.log(inspect(structuredClone(root), { depth: Infinity, colors: true }));
