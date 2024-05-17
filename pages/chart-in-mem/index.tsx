import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart (in-mem)';

await app.init();

document.body.prepend(app);

app.main.appendChild(
  <gui-chart
    value={{
      rows: [
        [new Date('2019-01-01T15:15:00Z'), -2.5],
        [new Date('2019-01-02T15:15:00Z'), 1.458],
        [new Date('2020-01-03T15:15:00Z'), 0.009],
        [new Date('2021-01-04T15:15:00Z'), 5.64],
      ],
      meta: ['Time', 'Value'],
    }}
    config={{
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
          xCol: 0,
          yCol: 1,
          yAxis: 'y',
          hideInTooltip: true,
          draw(ctx, _, xScale, yScale) {
            const [xMin, xMax] = xScale.range();
            const fixedY = yScale(4);
            ctx.simpleLine(xMin, fixedY, xMax, fixedY, { color: 'red' });
          },
        },
      ],
    }}
  />,
);
