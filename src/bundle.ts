// This entrypoint is used to create the bundled version
// of 'greycat.ui':
//  - dist/bundle/greycat.ui.js
//  - dist/bundle/greycat.ui.css
//
// It imports the ESM index and registers it on the global 'greycat' namespace under 'ui'
import * as ui from './index';
import * as std from '@greycat/lib-std';
import * as rpc from '@greycat/rpc';
import * as utils from '@greycat/utils';

// register the std library in the rpc layer
rpc.setFactory(std.stdFactory);

window.greycat = {
  ui,
  std,
  rpc,
  utils,
};

declare global {
  interface GreyCat {
    ui: typeof ui;
    std: typeof std;
    rpc: typeof rpc;
    utils: typeof utils;
  }

  interface Window {
    greycat: GreyCat;
  }
}
