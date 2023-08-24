// This entrypoint is used to create the bundled version
// of 'greycat.ui':
//  - dist/bundle/greycat.ui.js
//  - dist/bundle/greycat.ui.css
//
// It imports the ESM index and registers it on the global 'greycat' namespace under 'ui'
import * as sdk from '@greycat/sdk';

import './base.css';
// import './chart-utils/tooltip.css';
import './components/donut/donut.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './components/map/map.css';
// import './components/nodetime/nodetime.css';
// import './components/scatter-plot/scatter-plot.css';
import './components/table/table.css';
import './components/chart/chart.css';
import './components/tasks/task/task.css';
import './components/tasks/task-info/task-info.css';
import './components/tasks/task-create/task-create.css';
import './components/tasks/task-history-list/task-history-list.css';
import './components/tasks/task-running-list/task-running-list.css';


import * as ui from './index';

// we force cast to GreyCatGlobal even though 'default' is not set
// because we rely on apps to actually define the instance
window.greycat = {
  ui,
  sdk,
  utils: sdk.utils,
} as GreyCatGlobal;

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
