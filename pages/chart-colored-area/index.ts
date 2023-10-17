import { core } from '@greycat/sdk';

import { mount } from '../common';

mount(async (app, greycat) => {
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

  const table = await greycat.call<core.Table>('project::chart_colored_area');
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
        title: 'Warmth',
        type: 'area',
        yAxis: 'temp',
        yCol2: 'min',
        xCol: 0,
        yCol: 1,
        colorCol: 2,
        colorMapping: (v: keyof typeof colors) => colors[v],
      },
      // {
      //   title: 'Warmth',
      //   type: 'area',
      //   yAxis: 'temp',
      //   yCol2: 'min',
      //   xCol: 0,
      //   yCol: 1,
      //   colorCol: 2,
      //   colorMapping: (v: keyof typeof colors) => colors[v],
      // },
      {
        title: 'Value',
        type: 'scatter',
        yAxis: 'temp',
        xCol: 0,
        yCol: 1,
        colorCol: 2,
        colorMapping: (v: keyof typeof colors) => colors[v],
      },
    ],
  });

  toggleCursor.addEventListener('click', () => {
    chart.config.cursor = !chart.config.cursor;
  });
});