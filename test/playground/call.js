import '@greycat/sdk';
import { readBytes, displayValue } from './_utils.js';

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log(`usage: node ${process.argv[1]} <path/to/endpoint> [/path/to/args.gcb]`);
  process.exit(1);
}

const g = await gc.sdk.init();

try {
  const fnArgs = args[1] ? readBytes(args[1]) : undefined;
  const value = await g.call(args[0], fnArgs);
  displayValue(value);
} catch (err) {
  console.error(err.stack);
  process.exit(1);
}
