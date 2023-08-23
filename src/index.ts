import './base.css';
// import './chart-utils/tooltip.css';
import './components/donut/donut.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './components/map/map.css';
// import './components/nodetime/nodetime.css';
// import './components/scatter-plot/scatter-plot.css';
import './components/table/table.css';
import './components/chart/chart.css';
import './components/task-manager/task/task.css';
import './components/task-manager/task-info/task-info.css';
import './components/task-manager/task-create/task-create.css';
import './components/task-manager/task-history-list/task-history-list.css';

// importing @greycat/gui will import all the components
// this is necessary as WebComponent need to be registered
// in order to be used
import './components';

// ESM exports
export * from './components';
export * from './utils';
export * from './globals';
