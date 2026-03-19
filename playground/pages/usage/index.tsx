import '@greycat/web';
import '~/common';
import {
  BYTE_AXIS,
  BYTE_TOOLTIP,
  CHART_H,
  actionBar,
  init,
  onData,
  registerChart,
} from './shared.js';
import type { GuiChart2 } from '@greycat/web';

const greycat = await gc.sdk.init({ debug: true });

const memoryChart = (
  <gui-chart2
    style={CHART_H}
    config={{
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Memory', ...BYTE_AXIS }],
      series: [
        {
          type: 'line',
          yCol: 1,
          title: 'Process Memory',
          areaStyle: { opacity: 0.3 },
          smooth: true,
        },
        {
          type: 'line',
          yCol: 2,
          title: 'Global Memory',
          areaStyle: { opacity: 0.3 },
          smooth: true,
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

registerChart(memoryChart);

onData((data) => {
  const t = gc.core.Table.fromCols([data.times, data.processMemory, data.globalMemory]);
  t.headers = ['time', 'Process Memory', 'Global Memory'];
  memoryChart.value = t;
});

document.body.appendChild(
  <app-layout title="Usage">
    {actionBar}
    <gui-card>
      <header slot="header">Process & Global Memory</header>
      {memoryChart}
    </gui-card>
  </app-layout>,
);

await init(greycat);
