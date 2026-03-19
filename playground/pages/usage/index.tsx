import '@greycat/web';
import '~/common';
import * as echarts from 'echarts/core';
import { BYTE_AXIS, BYTE_TOOLTIP } from './shared';
import { chart2Config, type GuiChart2 } from '@greycat/web';

const greycat = await gc.sdk.init({ debug: true });

const root = await greycat.root();
const nt_usages = root['runtime::usages'];
const usage_table = await nt_usages.sample(
  gc.core.time.now().sub(gc.core.duration.from_hours(1)),
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
);

const usages = usage_table.cols[1] as gc.runtime.RuntimeUsage[];
const workers: GuiChart2[][] = [];
const worker_chart_style: GreyCat.ElementStyle = {
  height: '150px',
};
const worker_chart_grid_top = 50;

for (let wid = 0; wid < usages[0].workers.length; wid++) {
  workers[wid] = [
    (
      <gui-chart2
        style={worker_chart_style}
        value={usage_table}
        config={chart2Config({
          xCol: 0,
          xAxis: { type: 'time' },
          yAxis: [{ name: `Worker ${wid}: Memory`, ...BYTE_AXIS }],
          series: [
            {
              type: 'line',
              yCol: [1, 'runtime::RuntimeUsage::workers', wid, 'runtime::WorkerUsage::memory'],
            },
          ],
          tooltip: BYTE_TOOLTIP,
          legend: { enabled: false },
          grid: {
            top: worker_chart_grid_top,
            left: 25,
          },
          dataZoom: { enabled: true },
        })}
      />
    ) as GuiChart2,
    (
      <gui-chart2
        style={worker_chart_style}
        value={usage_table}
        config={chart2Config({
          xCol: 0,
          xAxis: { type: 'time' },
          yAxis: [{ name: `Worker ${wid}: Cache` }],
          series: [
            {
              type: 'line',
              yCol: [1, 'runtime::RuntimeUsage::workers', wid, 'runtime::WorkerUsage::cache'],
            },
          ],
          legend: { enabled: false },
          grid: {
            top: worker_chart_grid_top,
            left: 30,
          },
          dataZoom: { enabled: true },
        })}
      />
    ) as GuiChart2,
    (
      <gui-chart2
        style={worker_chart_style}
        value={usage_table}
        config={chart2Config({
          xCol: 0,
          xAxis: { type: 'time' },
          yAxis: [{ name: `Worker ${wid}: I/O`, ...BYTE_AXIS }],
          series: [
            {
              name: 'R',
              type: 'line',
              yCol: [1, 'runtime::RuntimeUsage::workers', wid, 'runtime::WorkerUsage::reads'],
            },
            {
              name: 'W',
              type: 'line',
              yCol: [1, 'runtime::RuntimeUsage::workers', wid, 'runtime::WorkerUsage::writes'],
            },
          ],
          tooltip: BYTE_TOOLTIP,
          legend: { enabled: true, position: 'right' },
          grid: {
            top: worker_chart_grid_top,
            right: 65,
          },
          dataZoom: { enabled: true },
          echarts: {
            legend: {
              top: 65,
              right: 5,
            },
          },
        })}
      />
    ) as GuiChart2,
  ];
}

const globalChart = (
  <gui-chart2
    style={{ height: '250px' }}
    value={usage_table}
    config={chart2Config({
      xCol: 0,
      xAxis: { type: 'time' },
      yAxis: [{ name: 'Memory', ...BYTE_AXIS }],
      series: [
        {
          name: 'Process (res)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_res_bytes'],
        },
        {
          name: 'Process (shr)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_shr_bytes'],
        },
        {
          name: 'GreyCat (global)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::global_memory'],
        },
        {
          name: 'OS (total)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::os_total_bytes'],
        },
        {
          name: 'OS (used)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::os_used_bytes'],
        },
        {
          name: 'Process (virt)',
          type: 'line',
          yCol: [1, 'runtime::RuntimeUsage::proc_virt_bytes'],
        },
      ],
      tooltip: BYTE_TOOLTIP,
      legend: { enabled: true },
      dataZoom: { enabled: true, type: 'both' },
      grid: {
        left: 70,
        right: 150,
      },
      echarts: {
        legend: {
          selected: {
            'OS (total)': false,
            'OS (used)': false,
            'Process (virt)': false,
          },
        },
      },
    })}
  />
) as GuiChart2;

document.body.appendChild(
  <app-layout title="Usage">
    {globalChart}

    <gui-tabs>
      <gui-tab slot="tab" active>
        Workers
      </gui-tab>
      <gui-tab slot="tab">Zones</gui-tab>

      <gui-panel slot="panel" tab="Workers">
        {workers.map((charts) => (
          <div style={{ display: 'flex', flexFlow: 'row' }}>{charts}</div>
        ))}
      </gui-panel>
      <gui-panel slot="panel" tab="Zones">
        <p>TODO zones charts</p>
      </gui-panel>
    </gui-tabs>
  </app-layout>,
);

// Sync zoom/pan and cursor across all charts
const allInstances = [globalChart, ...workers.flat()]
  .map((c) => c.getEChartsInstance()!)
  .filter(Boolean);
for (const instance of allInstances) {
  instance.setOption({ animation: false });
}
echarts.connect(allInstances);
