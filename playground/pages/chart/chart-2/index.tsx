import { type GuiChart2 } from '@greycat/web';
import { appLayout } from '~/common';
import './index.css';

const greycat = await gc.sdk.init({ debug: true });

const chart = (
  <gui-chart2
    value={await greycat.call('project::table')}
    config={{
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 1,
        },
      ],
      xAxis: { type: 'time' },
      yAxis: [{}],
      tooltip: { enabled: true, trigger: 'axis' },
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'inside' },
    }}
  />
) as GuiChart2;

document.body.appendChild(
  appLayout(
    'Chart 2',
    <a slot="action" href="#" onclick={() => chart.toggleConfig()}>
      Config
    </a>,
    chart,
  ),
);
