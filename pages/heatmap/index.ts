import type { core } from '@greycat/sdk';
import '../layout';
import './index.css';

const app = document.createElement('app-layout');
app.title = 'Heatmap';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::heatmap');

const heatmap = document.createElement('gui-heatmap');
heatmap.style.width = '100%';
heatmap.style.height = '768px';
app.main.appendChild(heatmap);

heatmap.config = {
  table: table,
  displayValue: true,

  colorScale: {
    title: 'Average in °C',
    colors: ['cyan', 'orange', 'red'],
  },
  xAxis: {
    title: 'Month',
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    innerPadding: 0.05,
  },
  yAxis: {
    title: 'City',
    labels: ['Paris', 'London', 'New-York', 'Beijing', 'Perth', 'Oslo'],
    innerPadding: 0.05,
  },
};
