import { type GuiHeatmap, type core, $, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import './index.css';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const table = await $.default.call<core.Table>('project::heatmap');
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
    <fieldset slot="action" role="group">
      <label>Tooltip position</label>
      <select
        onchange={(ev) => {
          heatmap.config.tooltip = {
            position: (ev.target as HTMLSelectElement).value as 'follow' | 'in-place',
          };
        }}
      >
        <option value="follow">follow</option>
        <option value="in-place">in-place</option>
      </select>
    </fieldset>
    {heatmap}
  </app-layout>,
);
