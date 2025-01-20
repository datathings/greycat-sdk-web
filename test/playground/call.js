import '@greycat/web/sdk';
import path from 'node:path';
import { readBytes, displayValue } from './_utils.js';

const cwd = process.cwd();
const raw_args = process.argv.slice(2);
if (raw_args.length < 1) {
  console.log(`usage: node ${path.relative(cwd, process.argv[1])} [OPTIONS] <path/to/endpoint> [/path/to/args.gcb]`);
  console.log();
  console.log(`OPTIONS:`);
  console.log(` --json    displays the result as JSON`);
  process.exit(1);
}

/** @type {string[]} */
const args = [];

let json = false;
for (const arg of raw_args) {
  if (arg === '--json') {
    json = true;
  } else {
    args.push(arg);
  }
}

const g = await gc.sdk.init();

try {
  const fnArgs = args[1] ? readBytes(args[1]) : undefined;
  const value = await g.call(args[0], fnArgs);
  displayValue(value, json);
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}
