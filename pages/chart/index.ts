import { core } from '@greycat/sdk';
import { mount } from '../common';

mount(async (app, greycat) => {
  const nbRows = document.querySelector('#nb-rows') as HTMLInputElement;
  const randomizeBtn = document.querySelector('#randomize') as HTMLAnchorElement;
  const topLeft = document.querySelector('#top-left') as HTMLAnchorElement;
  const topRight = document.querySelector('#top-right') as HTMLAnchorElement;
  const bottomLeft = document.querySelector('#bottom-left') as HTMLAnchorElement;
  const bottomRight = document.querySelector('#bottom-right') as HTMLAnchorElement;
  const toggleCursor = document.querySelector('#toggle-cursor') as HTMLAnchorElement;

  const table = await greycat.call<core.Table>('project::chart', [150]);

  const LINE_COL = 0;
  const SCATTER_COL = 1;
  const AREA_COL = 2;
  const BAR_COL = 3;
  const LINE_TYPE_COL = 4;
  const LINE_COLOR_COL = 5;

  const chart = document.createElement('gui-chart');
  chart.style.height = '100%';
  app.appendChild(chart);

  const customColorMap = {
    Low: 'red',
    Medium: 'blue',
    High: null,
  };

  chart.config = {
    cursor: true,
    selection: {
      orientation: 'both',
    },
    xAxis: {
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
        width: 4,
        lineTypeCol: LINE_TYPE_COL,
        colorCol: LINE_COLOR_COL,
        colorMapping: (v) => customColorMap[v.key as keyof typeof customColorMap],
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
    const table = await greycat.call<core.Table>('project::chart', [+nbRows.value]);
    console.log({ table });
    chart.config.table = table;
    chart.compute();
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
});