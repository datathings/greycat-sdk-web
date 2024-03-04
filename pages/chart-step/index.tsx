import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart (step)';

await app.init();

document.body.prepend(app);

const chart = document.createElement('gui-chart');
app.main.appendChild(chart);

const timepoints = [
  new Date('2023-01-01T00:00:00Z'),
  new Date('2023-04-01T00:00:00Z'),
  new Date('2023-08-01T00:00:00Z'),
  new Date('2023-10-01T00:00:00Z'),
  new Date('2023-12-01T00:00:00Z'),
];

chart.setConfig({
  cursor: true,
  xAxis: {
    scale: 'time',
    ticks: timepoints,
  },
  yAxes: {
    balance: {},
  },
  table: {
    cols: [
      timepoints,
      [2000, 25000, 100000, 170, 3200],
    ],
  },
  series: [
    {
      title: 'Value',
      type: 'line',
      curve: 'step-after',
      yAxis: 'balance',
      xCol: 0,
      yCol: 1,
    },
  ],
});
