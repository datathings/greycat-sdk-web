import { core } from '@greycat/sdk';

import { mount } from '../common';

mount(async (app, greycat) => {
  const randomizeBtn = document.querySelector('#randomize') as HTMLButtonElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLButtonElement;
  const currentValue = document.querySelector('#current-value') as HTMLDivElement;

  const chart = document.createElement('gui-chart');
  chart.style.height = '100%';
  app.appendChild(chart);

  chart.addEventListener('selection', (e) => {
    const from = core.time.fromMs(e.detail.from as number);
    const to = core.time.fromMs(e.detail.to as number);
    console.log(`selection from ${from} to ${to}`);
  });

  let table = await greycat.call<core.Table>('project::chart_colored_area');
  console.log(table);

  const colors = {
    low: 'cyan', //'#3498db',
    normal: 'orange',//'#2ecc71',
    high: 'green',//'#e74c3c',
  };

  chart.setConfig({
    tooltip: {
      // Override default tooltip
      render: (data) => {
        currentValue.innerHTML = `${data[0].xValue}, ${data[0].yValue}`;
      },
    },
    selection: {
      orientation: 'both',
    },
    cursor: true,
    xAxis: {
      scale: 'time',
      format: '%a, %d/%m/%y',
    },
    yAxes: {
      temp: {},
    },
    table,
    series: [
      {
        title: 'Value',
        type: 'line+area',
        yAxis: 'temp',
        xCol: 0,
        yCol: 1,
        colorCol: 2,
        colorMapping: (v: keyof typeof colors) => colors[v],
      },
    ],
  });

  // eslint-disable-next-line no-inner-declarations
  async function randomize() {
    table = await greycat.call<core.Table>('project::chart_colored_area');
    console.log({ table });
    chart.config.table = table;
    chart.compute();
    chart.update();
  }

  randomizeBtn.addEventListener('click', randomize);
  toggleCursor.addEventListener('click', () => {
    chart.config.cursor = !chart.config.cursor;
  });
});