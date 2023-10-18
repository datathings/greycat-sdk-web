import * as d3 from 'd3';
import { core } from '@greycat/sdk';

import { mount } from '../common';

mount((app) => {
  const randomizeBtn = document.querySelector('#randomize') as HTMLButtonElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLButtonElement;

  const chart = document.createElement('gui-chart');
  chart.style.height = '100%';
  app.appendChild(chart);

  chart.addEventListener('selection', (e) => {
    const from = core.time.fromMs(e.detail.from as number);
    const to = core.time.fromMs(e.detail.to as number);
    console.log(`selection from ${from} to ${to}`);
  });

  chart.setConfig({
    table: {
      cols: [
        Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
        Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
      ],
    },
    series: [
      {
        type: 'scatter',
        yAxis: 'left',
        yCol: 1,
        xCol: 0,
      },
    ],
    xAxis: {
      scale: 'linear',
      min: 0,
      max: 10,
    },
    yAxes: { left: { scale: 'linear', min: 0, max: 10 } },
    cursor: true,
    selection: { orientation: 'both' },

  });

  // eslint-disable-next-line no-inner-declarations
  async function randomize() {
    chart.config.table = {
      cols: [
        Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
        Array.from({ length: 1000 }, d3.randomNormal(5, 1)),
      ],
    };
    chart.compute();
    chart.update();
  }

  randomizeBtn.addEventListener('click', randomize);
  toggleCursor.addEventListener('click', () => {
    chart.config.cursor = !chart.config.cursor;
  });
});