import type { core } from '@greycat/sdk';
import '../layout';
import './index.css';
import { HeatmapConfig } from '../../src';

const app = document.createElement('app-layout');
app.title = 'Heatmap';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::heatmap');

const heatmap = document.createElement('gui-heatmap');
heatmap.style.width = '100%';
heatmap.style.height = '768px';
app.main.appendChild(heatmap);

const config: HeatmapConfig = {
  table: table,
  displayValue: true,

  xAxis: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    padding: 0.1,
  },
  yAxis: {
    labels: ['Paris', 'London', 'New-York', 'Beijing', 'Perth', 'Oslo'],
    padding: 0.1,
  },
  tooltip: {
    position: 'follow',
  },
};

heatmap.config = config;
