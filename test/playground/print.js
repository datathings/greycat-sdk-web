import { Abi, AbiReader } from '@greycat/web/sdk';
import { readBytes } from './_utils.js';

const [filepath] = process.argv.slice(2);
if (!filepath) {
  console.log('usage: print.js <filepath>');
  process.exit(1);
}

const abi = new Abi(readBytes('gcdata/abi'));
const reader = new AbiReader(abi, readBytes(filepath));

try {
  reader.headers();
  for (const value of reader) {
    console.dir(value, { depth: Infinity, getters: true });
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
