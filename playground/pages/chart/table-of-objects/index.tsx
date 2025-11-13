import '@greycat/web';
import { chartConfig } from '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const table = await gc.project.table_of_objects();
const table2 = await gc.project.table_of_objects3();

document.body.appendChild(
  <app-layout title="Chart • Table of objects">
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <gui-chart
        value={table}
        config={chartConfig({
          xAxis: {
            scale: 'time',
          },
          yAxes: {
            y: {},
          },
          series: [
            {
              type: 'line',
              xCol: 'project::TimeRecord::time',
              yCol: ['project::TimeRecord::value', 'project::Composed::b'],
              yAxis: 'y',
            },
            {
              type: 'scatter',
              xCol: 'project::TimeRecord::time',
              yCol: ['project::TimeRecord::value', 'project::Composed::a'],
              yAxis: 'y',
            },
          ],
        })}
      />
      <gui-chart
        value={table2}
        config={{
          xAxis: {
            scale: 'time',
          },
          yAxes: {
            y: {},
          },
          series: [
            {
              type: 'line',
              xCol: 0,
              yCol: [1, 'project::SeriesObject::a'],
              yAxis: 'y',
            },
          ],
        }}
      />
    </div>
  </app-layout>,
);
