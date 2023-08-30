// This entrypoint is used to create the bundled version
// of 'greycat.ui':
//  - dist/bundle/greycat.ui.js
//  - dist/bundle/greycat.ui.css
//
// It imports the ESM index and registers it on the global 'greycat' namespace under 'ui'
import * as sdk from '@greycat/sdk';
import * as ui from './index';

globalThis.greycat = globalThis.greycat ?? {};
globalThis.greycat.ui = ui;
globalThis.greycat.sdk = sdk;
globalThis.greycat.utils = sdk.utils;

declare global {
  interface GreyCatGlobal {
    /**
     * `@greycat/ui` package
     */
    ui: typeof ui;
    /**
     * `@greycat/sdk` package
     */
    sdk: typeof sdk;
    /**
     * Convenience re-export from `@greycat/sdk/utils`
     */
    utils: typeof sdk.utils,
    /**
     * Default GreyCat instance
     */
    default: sdk.GreyCat;
  }

  interface Window {
    greycat: GreyCatGlobal;
  }
}
