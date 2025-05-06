import '@greycat/web/sdk';
import path from 'node:path';
import { stdin_read, readBytes, displayValue } from './_utils.js';

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
  let fnArgs;
  if (args[1] === undefined) {
    const raw_fn_args = await stdin_read();
    fnArgs = JSON.parse(raw_fn_args);
    if (!Array.isArray(fnArgs)) {
      throw new Error('fn arguments must be given in an array');
    }
  } else {
    // reads args from gcb file
    fnArgs = readBytes(args[1]);
  }
  const value = await g.call(args[0], fnArgs);
  displayValue(value, json);
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}
