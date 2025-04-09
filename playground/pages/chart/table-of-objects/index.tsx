import '@greycat/web';
import '~/common';

await gc.sdk.init();

const table = await gc.project.table_of_objects();
console.log(table);

const table_col_1 = table.getRow()

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
            yCol: [''],
            yAxis: 'y',
          },
        ],
      }}
    />
  </app-layout>,
);
