import type { GuiChart2 } from '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init({ debug: true });

const table = await greycat.call<gc.core.Table>('project::chart_time');

const chart = (
  <gui-chart2
    config={{
      series: [
        {
          type: 'line',
          title: 'Value',
          yCol: 1,
        },
      ],
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{}],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
    }}
    value={table}
  />
) as GuiChart2;

document.body.appendChild(
  <app-layout title="Chart2 (ECharts)">
    <a slot="action" href="#" onclick={() => chart.toggleConfig()}>
      Config
    </a>
    <a
      slot="action"
      href="#"
      onclick={async () => {
        chart.value = await greycat.call('project::chart_time');
      }}
    >
      Randomize
    </a>
    {chart}
  </app-layout>,
);
