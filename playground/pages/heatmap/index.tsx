import { type GuiHeatmap, sl } from '@greycat/web';
import '@/common';
import './index.css';

await gc.sdk.init();

const table = await gc.project.heatmap();
console.log('heatmap table', table);

const heatmap = (
  <gui-heatmap
    value={table}
    config={{
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
      tooltip: {
        position: 'in-place',
      },
    }}
  />
) as GuiHeatmap;

document.body.appendChild(
  <app-layout title="Heatmap">
    <sl-select
      slot="action"
      className="label-on-left"
      label="Tooltip position"
      hoist
      value={heatmap.config.tooltip?.position}
      onsl-change={function (this: sl.SlSelect) {
        heatmap.config.tooltip = { position: this.value as 'follow' | 'in-place' };
        heatmap.update();
      }}
    >
      <sl-option value="follow">follow</sl-option>
      <sl-option value="in-place">in-place</sl-option>
    </sl-select>
    {heatmap}
  </app-layout>,
);
