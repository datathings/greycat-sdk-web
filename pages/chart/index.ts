import './index.css';
import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src';
import type { GuiChart } from '../../src';

try {
  const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const nbRows = document.querySelector('#nb-rows') as HTMLInputElement;
  const randomizeBtn = document.querySelector('#randomize') as HTMLButtonElement;
  const topLeft = document.querySelector('#top-left') as HTMLButtonElement;
  const topRight = document.querySelector('#top-right') as HTMLButtonElement;
  const bottomLeft = document.querySelector('#bottom-left') as HTMLButtonElement;
  const bottomRight = document.querySelector('#bottom-right') as HTMLButtonElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLButtonElement;
  const toggleTheme = document.querySelector('#toggle-theme') as HTMLButtonElement;

  let table = await greycat.call<core.Table>('project::random_table', [150]);
  console.log({ table });

  const LINE_COL = 0;
  const SCATTER_COL = 1;
  const AREA_COL = 2;
  const BAR_COL = 3;
  const LINE_TYPE_COL = 4;

  const chart = document.querySelector('gui-chart') as GuiChart;

  chart.config = {
    cursor: true,
    xAxis: {
      // min: -1,
      // max: 150,
      cursorFormat: '.0f',
    },
    yAxes: {
      left: {
        min: 0,
        max: 200,
      },
      right: {
        position: 'right',
      },
    },
    table,
    series: [
      {
        type: 'line',
        title: 'Custom',
        yAxis: 'left',
        yCol: LINE_COL,
        lineTypeCol: LINE_TYPE_COL,
      },
      {
        type: 'line+scatter',
        yAxis: 'left',
        yCol: SCATTER_COL,
      },
      {
        type: 'line+area',
        yAxis: 'right',
        yCol: AREA_COL,
      },
      {
        type: 'bar',
        yAxis: 'left',
        yCol: BAR_COL,
        width: 10,
        color: 'orange',
      },
      {
        type: 'line+area',
        yAxis: 'left',
        yCol: AREA_COL,
        yCol2: LINE_COL,
      },
    ],
  };

  // eslint-disable-next-line no-inner-declarations
  async function randomize() {
    table = await greycat.call<core.Table>('project::random_table', [+nbRows.value]);
    console.log({ table });
    chart.config.table = table;
    chart.update();
  }

  randomizeBtn.addEventListener('click', randomize);
  nbRows.addEventListener('input', randomize);
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