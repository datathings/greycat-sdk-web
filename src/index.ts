import 'maplibre-gl/dist/maplibre-gl.css';

import './base.css';
import './chart-utils/tooltip.css';
import './components/donut/donut.css';
import './components/map/map.css';
import './components/nodetime/nodetime.css';
import './components/scatter-plot/scatter-plot.css';
import './components/table/table.css';
import './components/chart/chart.css';

// importing @greycat/gui will import all the components
// this is necessary as WebComponent need to be registered
// in order to be used
import './components';

// ESM exports
export * from './components';
export * from './utils';
export * from './globals';
