import { chart2Config } from '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const table = await gc.project.table_of_objects();
const table2 = await gc.project.table_of_objects3();

document.body.appendChild(
  <app-layout title="Chart2 — Table of Objects">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
      {/* Typed table with FQN column mapping via chart2Config() */}
      <gui-chart2
        value={table}
        config={chart2Config({
          xCol: 'project::TimeRecord::time',
          xAxis: { type: 'time' },
          yAxis: [{}],
          series: [
            {
              type: 'line',
              yCol: ['project::TimeRecord::value', 'project::Composed::b'],
              title: 'Composed.b',
            },
            {
              type: 'scatter',
              yCol: ['project::TimeRecord::value', 'project::Composed::a'],
              title: 'Composed.a',
              symbolSize: 6,
            },
          ],
          tooltip: { enabled: true, trigger: 'axis' },
          legend: { enabled: true },
        })}
      />
      {/* Mixed: numeric index for column 0, FQN path for nested field */}
      <gui-chart2
        value={table2}
        config={{
          xCol: 0,
          xAxis: { type: 'time' },
          yAxis: [{}],
          series: [
            {
              type: 'line',
              yCol: [1, 'project::SeriesObject::a'],
              title: 'SeriesObject.a',
            },
          ],
          tooltip: { enabled: true, trigger: 'axis' },
          legend: { enabled: true },
        }}
      />
    </div>
  </app-layout>,
);
