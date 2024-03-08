import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart (in-mem)';

await app.init();

document.body.prepend(app);

app.main.appendChild(
  <gui-chart
    config={{
      table: {
        cols: [
          [
            new Date('2020-01-01T15:15:00Z'),
            new Date('2020-01-02T15:15:00Z'),
            new Date('2020-01-03T15:15:00Z'),
            new Date('2020-01-04T15:15:00Z'),
          ],
          [-2.5, 1.458, 0.009, 5.64],
        ],
      },
      cursor: true,
      xAxis: { scale: 'time' },
      yAxes: {
        y: {
          // cursorAlign: 'start',
        },
      },
      series: [{ type: 'line', xCol: 0, yCol: 1, yAxis: 'y' }],
    }}
  />,
);
