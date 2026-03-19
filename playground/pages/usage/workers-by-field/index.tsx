import '@greycat/web';
import '~/common';
import type { GuiChart2, Chart2Config } from '@greycat/web';
import {
  BYTE_AXIS,
  BYTE_TOOLTIP,
  DEFAULT_TOOLTIP,
  CHART_H,
  actionBar,
  init,
  onData,
  registerChart,
  getLastData,
  type N,
  type FlatUsageData,
} from '../shared.js';

const greycat = await gc.sdk.init({ debug: true });

type WorkerField = 'memory' | 'cache' | 'reads' | 'writes';

const WORKER_FIELD_ARRAYS: Record<WorkerField, (d: FlatUsageData) => N[][]> = {
  memory: (d) => d.workerMemory,
  cache: (d) => d.workerCache,
  reads: (d) => d.workerReads,
  writes: (d) => d.workerWrites,
};

let selectedField: WorkerField = 'memory';
const chart = (<gui-chart2 style={CHART_H} />) as GuiChart2;
registerChart(chart);

function buildConfig(field: WorkerField, count: number): Chart2Config {
  const series: Chart2Config['series'] = [];
  for (let w = 0; w < count; w++) {
    series.push({ type: 'line', yCol: w + 1, title: `Worker ${w}` });
  }
  return {
    xCol: 0,
    xAxis: { type: 'time' },
    yAxis: [{ name: field, ...BYTE_AXIS }],
    series,
    tooltip: BYTE_TOOLTIP,
    legend: { enabled: false },
    dataZoom: { enabled: true, type: 'inside' },
  };
}

function update(data: FlatUsageData) {
  if (data.workerCount === 0) return;
  const arrays = WORKER_FIELD_ARRAYS[selectedField](data);
  const cols: unknown[][] = [data.times, ...arrays];
  const table = gc.core.Table.fromCols(cols);
  table.headers = ['time', ...Array.from({ length: data.workerCount }, (_, i) => `Worker ${i}`)];
  chart.setAttrs({ value: table, config: buildConfig(selectedField, data.workerCount) });
}

const fieldSelect = (
  <sl-select
    size="small"
    value="memory"
    style="width: 140px;"
    onsl-change={(e: Event) => {
      selectedField = (e.target as HTMLSelectElement).value as WorkerField;
      const data = getLastData();
      if (data) update(data);
    }}
  >
    <sl-option value="memory">Memory</sl-option>
    <sl-option value="cache">Cache</sl-option>
    <sl-option value="reads">Reads</sl-option>
    <sl-option value="writes">Writes</sl-option>
  </sl-select>
) as HTMLSelectElement;

onData(update);

document.body.appendChild(
  <app-layout title="Usage — Workers by Field">
    {actionBar}
    <div style="padding: 8px 8px 0;">{fieldSelect}</div>
    <div style="padding: 8px;">{chart}</div>
  </app-layout>,
);

await init(greycat);
