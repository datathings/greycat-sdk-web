import * as sdk from './exports.js';

Object.assign(globalThis, { greycat: sdk });

declare global {
  let greycat: typeof sdk;
}

export * from './exports.js';
