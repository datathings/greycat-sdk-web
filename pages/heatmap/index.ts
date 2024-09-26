import type { core } from '@greycat/sdk';
import '../layout';
import './index.css';

const app = document.createElement('app-layout');
app.title = 'Heatmap';
await app.init();

document.body.appendChild(app);

app.addSimpleAction(`Switch tooltip to 'in-place'`, (_, a) => {
  const oldpos = heatmap.config.tooltip ? heatmap.config.tooltip.position ? heatmap.config.tooltip.position : 'follow' : 'follow';
  const newpos = oldpos === 'in-place' ? 'follow' : 'in-place';
  heatmap.config.tooltip = { position: newpos };
  a.textContent = `Switch tooltip to '${oldpos}'`;
});

const heatmap = document.createElement('gui-heatmap');
heatmap.config = {
  table: await greycat.default.call<core.Table>('project::heatmap'),
  displayValue: true,
  markerColor: 'white',

  colorScale: {
    title: 'Average in °C',
    colors: ['cyan', 'orange', 'red'],
  },
  xAxis: {
    title: 'Month',
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    innerPadding: 0.05,
  },
  yAxis: {
    title: 'City',
    labels: ['Paris', 'London', 'New-York', 'Beijing', 'Perth', 'Oslo'],
    innerPadding: 0.05,
  },
};
app.main.appendChild(heatmap);
