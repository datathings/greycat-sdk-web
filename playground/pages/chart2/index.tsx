import '@greycat/web';
import type { GuiChart2 } from '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

const table = await greycat.call<gc.core.Table>('project::chart_time');

const chart = (
  <gui-chart2
    value={table}
    config={{
      series: [
        {
          type: 'line',
          name: 'Value',
          yCol: 1,
        },
      ],
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{}],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'slider' },
    }}
  />
) as GuiChart2;

document.body.appendChild(
  appLayout(
    'Chart2 (ECharts)',
    <a slot="action" href="#" onclick={() => chart.toggleConfig()}>
      Config
    </a>,
    <a
      slot="action"
      href="#"
      onclick={async () => {
        chart.value = await greycat.call('project::chart_time');
      }}
    >
      Randomize
    </a>,
    chart,
  ),
);
