import { GuiChart, toColumnBasedTable } from '../../src';
import '../layout';
import * as d3 from 'd3';

const app = document.createElement('app-layout');
app.title = 'Chart (in-mem)';

await app.init();

document.body.prepend(app);

const startDate = new Date(2023, 0, 1); // January 1, 2023
const endDate = new Date(2023, 11, 31); // December 31, 2023

// Generate an array of dates with daily intervals
const timeRange = d3.timeDays(startDate, endDate, 10);
const data = Array.from({ length: timeRange.length }, d3.randomUniform(2));

const timeRange2 = d3.timeDays(endDate, new Date(2024, 11, 31), 10);
const data2 = Array.from({ length: timeRange2.length }, d3.randomUniform(5));
const table2 = toColumnBasedTable({
  cols: [data2, timeRange2],
});

const chart = (
  <gui-chart
    config={{
      table: toColumnBasedTable({
        cols: [timeRange, data],
        meta: ['Time', 'Value'],
      }),
      cursor: true,
      xAxis: { scale: 'time' },
      yAxes: {
        y: {},
      },
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 1,
          yAxis: 'y',
        },
        {
          type: 'custom',
          xCol: 1,
          yCol: 0,
          yAxis: 'y',
          table: table2,
          draw(ctx, serie, xScale, yScale) {
            ctx.line(table2, serie, xScale, yScale);
          },
        },
      ],
    }}
  />
) as GuiChart;

app.main.appendChild(chart);

console.log(chart.config);
