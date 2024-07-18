import * as web from './exports.js';

export * from './exports.js';

globalThis.greycat = globalThis.greycat ?? {};
Object.assign(globalThis.greycat, web);

declare global {
  type GreyCatWeb = typeof web;
  interface GreyCatGlobal extends GreyCatWeb { }

  interface Window {
    greycat: GreyCatGlobal;
  }
}
