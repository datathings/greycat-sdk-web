import '@greycat/web';
import { chartConfig, inferConfig } from '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const earthquakes = await gc.heatmap.all_earthquakes();

const initialConfig = chartConfig({
  xAxis: { scale: 'time' },
  yAxes: { mag: {} },
  series: [
    {
      title: 'Magnitude',
      type: 'line',
      yAxis: 'mag',
      xCol: 'heatmap::Earthquake::time',
      yCol: 'heatmap::Earthquake::mag',
    },
  ],
});

const config = document.createElement('gui-chart-config');
config.value = initialConfig;
const object = document.createElement('gui-object');
object.value = initialConfig;
object.expanded = true;

// sync config updates with object display
config.addEventListener('gui-chart-config-update', () => {
  const newConfig = config.value;
  object.value = newConfig;
  console.log(newConfig);
});

function infer() {
  console.log(earthquakes.$type);
  const table = gc.core.Table.fromObjects(earthquakes);
  const newConfig = inferConfig(table);
  config.value = newConfig;
  object.value = newConfig;
}

document.body.appendChild(
  <app-layout title="Chart (config)" mainClassName="gui-list">
    <sl-button onclick={infer}>Infer</sl-button>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing)' }}>
      {config}
      {object}
    </div>
    <gui-chart value={earthquakes} drawerEnabled style={{ minHeight: '600px' }} />
  </app-layout>,
);
