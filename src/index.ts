import './reset.js';
import * as greycat from './exports.js';

export * from './exports.js';

globalThis.greycat = globalThis.greycat ?? {};
Object.assign(globalThis.greycat, greycat);

declare global {
  type GreyCatExt = typeof greycat;
  interface GreyCatGlobal extends GreyCatExt {}

  interface Window {
    greycat: GreyCatGlobal;
  }
}
