import '@greycat/web/sdk';
import * as web from './exports.js';

Object.assign(globalThis.gc, { web });
declare global {
  namespace gc {
    const web: typeof import('.');
  }
}

export * from './exports.js';
