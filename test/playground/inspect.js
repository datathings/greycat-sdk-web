//
// use this file to inspect debug quickly a problem
//
//
// run with: `node --inspect-brk debug.js`
// then in VSCode: `ctrl+shift+p` > `Debug: Attach to Node Process`
//
import '@greycat/web/sdk';
import { readBytes } from './_utils.js';
const [filepath] = process.argv.slice(2);
if (!filepath) {
  throw new Error('usage: <filepath>');
}

const abi = new gc.sdk.Abi(readBytes('./gcdata/store/abi'));
const reader = new gc.sdk.AbiReader(abi, readBytes(filepath));

const value = reader.deserializeWithHeaders();
console.log(structuredClone(value));

const writer = new gc.sdk.AbiWriter(abi);
writer.serialize(value);

const value2 = new gc.sdk.AbiReader(abi, writer.buffer.buffer).deserialize();
console.log(structuredClone(value2));
