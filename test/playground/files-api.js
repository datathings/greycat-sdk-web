// @ts-check
import { inspect } from 'util';
import { GreyCat, std } from '@greycat/web/sdk';

await GreyCat.init();

const root = std.io.File.create('/', null, null);
await root.resolve();

console.log(inspect(structuredClone(root), { depth: Infinity, colors: true }));
