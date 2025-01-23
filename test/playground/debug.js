//
// use this file to debug quickly a problem
//
//
// run with: `node --inspect-brk debug.js`
// then in VSCode: `ctrl+shift+p` > `Debug: Attach to Node Process`
//
import { readFileSync } from 'node:fs';
import '@greycat/web/sdk';
const [filepath] = process.argv.slice(2);
if (!filepath) {
  throw new Error('usage: <filepath>');
}

const abi = new gc.sdk.Abi(readFile('./gcdata/store/abi'));
const reader = new gc.sdk.AbiReader(abi, readFile(filepath));

const value = reader.deserializeWithHeaders();
console.log(structuredClone(value));

const writer = new gc.sdk.AbiWriter(abi);
writer.serialize(value);

const value2 = new gc.sdk.AbiReader(abi, writer.buffer.buffer).deserialize();
console.log(structuredClone(value2));

/**
 * Node.js API can return re-used buffers from `readFileSync`
 * so we have to slice to the proper offset to get our own shrinked
 * `ArrayBuffer` from it.
 * @param {string} filepath
 * @returns
 */
function readFile(filepath) {
  const b = readFileSync(filepath);
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
}