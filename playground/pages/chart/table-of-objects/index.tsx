import '@greycat/web';
import '~/common';

await gc.sdk.init();

const table = await gc.project.table_of_objects();
console.log(table);

document.body.appendChild(
  <app-layout title="Chart • Table of objects">
    <gui-chart
      value={table}
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
            yCol: ['project::TimeRecord::value', 'project::Composed::b'],
            yAxis: 'y',
          },
        ],
      }}
    />
  </app-layout>,
);
