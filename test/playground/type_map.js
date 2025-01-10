// @ts-check
import { Abi } from '@greycat/web/sdk';
import { readBytes } from './_utils.js';

try {
  const [filter = ''] = process.argv.slice(2);
  const searchString = filter.toLowerCase();
  const abi = new Abi(readBytes('gcdata/abi'));
  const type_map = new Map(
    abi.types
      .filter((t) => t.name.toLowerCase().indexOf(searchString) !== -1)
      .map((t) => [t.mapped_type_off, t.name]),
  );
  console.dir(type_map, { maxArrayLength: Infinity });
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}
