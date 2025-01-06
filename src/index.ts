import * as web from './exports.js';

Object.assign(globalThis, { greycat: web });

declare global {
  let greycat: typeof web;
}

export * from './exports.js';
