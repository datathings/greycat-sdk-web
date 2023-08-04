// This entrypoint is used to create the bundled version
// of 'greycat.ui':
//  - dist/bundle/greycat.ui.js
//  - dist/bundle/greycat.ui.css
//
// It imports the ESM index and registers it on the global 'greycat' namespace under 'ui'
import * as ui from './index';
import * as sdk from '@greycat/sdk';

window.greycat = {
  ui,
  sdk,
  utils: sdk.utils,
};

declare global {
  interface GreyCat {
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
  }

  interface Window {
    greycat: GreyCat;
  }
}
