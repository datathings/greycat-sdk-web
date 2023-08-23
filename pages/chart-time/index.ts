import './index.css';
import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src';
import type { GuiChart } from '../../src';

try {
  const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const randomizeBtn = document.querySelector('#randomize') as HTMLButtonElement;
  const topLeft = document.querySelector('#top-left') as HTMLButtonElement;
  const topRight = document.querySelector('#top-right') as HTMLButtonElement;
  const bottomLeft = document.querySelector('#bottom-left') as HTMLButtonElement;
  const bottomRight = document.querySelector('#bottom-right') as HTMLButtonElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLButtonElement;
  const toggleTheme = document.querySelector('#toggle-theme') as HTMLButtonElement;

  const chart = document.querySelector('gui-chart') as GuiChart;
  let table = await greycat.call<core.Table>('project::table');

  console.log(table);

  chart.config = {
    cursor: true,
    xAxis: {
      scale: 'time',
      format: '%b %d',
      // min: table.cols[0][0] as core.time,
      // max: table.cols[0][table.cols[0].length - 1] as core.time,
    },
    yAxes: {
      y: {
        min: 0,
        max: 150,
      },
    },
    table,
    series: [
      {
        title: 'My Title',
        type: 'line',
        yAxis: 'y',
        xCol: 0,
        yCol: 1,
      },
    ],
  };

  // eslint-disable-next-line no-inner-declarations
  async function randomize() {
    table = await greycat.call<core.Table>('project::table');
    console.log({ table });
    chart.config.table = table;
    chart.update();
  }

  randomizeBtn.addEventListener('click', randomize);
  topLeft.addEventListener('click', () => {
    if (chart.config.tooltip === undefined) {
      chart.config.tooltip = {};
    }
    chart.config.tooltip.position = 'top-left';
  });
  topRight.addEventListener('click', () => {
    if (chart.config.tooltip === undefined) {
      chart.config.tooltip = {};
    }
    chart.config.tooltip.position = 'top-right';
  });
  bottomLeft.addEventListener('click', () => {
    if (chart.config.tooltip === undefined) {
      chart.config.tooltip = {};
    }
    chart.config.tooltip.position = 'bottom-left';
  });
  bottomRight.addEventListener('click', () => {
    if (chart.config.tooltip === undefined) {
      chart.config.tooltip = {};
    }
    chart.config.tooltip.position = 'bottom-right';
  });
  toggleCursor.addEventListener('click', () => {
    chart.config.cursor = !chart.config.cursor;
  });
  toggleTheme.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') ?? 'black';
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
  });
} catch (err) {
  document.documentElement.textContent = `Is GreyCat started?`;
}