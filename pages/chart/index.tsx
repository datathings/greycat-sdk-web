import { core } from '@greycat/sdk';
import '../layout';
import { SerieStyle } from '../../src';

const app = document.createElement('app-layout');
app.title = 'Chart';
await app.init();

document.body.appendChild(app);

const nbRows = (
  <input
    name="nb-rows"
    id="nb-rows"
    type="number"
    min="1"
    max="10000"
    value="150"
    oninput={randomize}
  />
) as HTMLInputElement;
app.actions.prepend(
  <>
    <li>{nbRows}</li>
    <li>
      <a href="#" onclick={randomize}>
        Randomize
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          if (chart.config.tooltip === undefined) {
            chart.config.tooltip = {};
          }
          chart.config.tooltip.position = 'top-left';
        }}
      >
        Top-left
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          if (chart.config.tooltip === undefined) {
            chart.config.tooltip = {};
          }
          chart.config.tooltip.position = 'top-right';
        }}
      >
        Top-right
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          if (chart.config.tooltip === undefined) {
            chart.config.tooltip = {};
          }
          chart.config.tooltip.position = 'bottom-left';
        }}
      >
        Bottom-left
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          if (chart.config.tooltip === undefined) {
            chart.config.tooltip = {};
          }
          chart.config.tooltip.position = 'bottom-right';
        }}
      >
        Bottom-right
      </a>
    </li>
    <li>
      <a
        href="#"
        onclick={() => {
          chart.config.cursor = !chart.config.cursor;
        }}
      >
        Toggle cursor
      </a>
    </li>
  </>,
);

const table = await greycat.default.call<core.Table>('project::chart', [150]);

const chart = document.createElement('gui-chart');
app.main.replaceChildren(chart);

const LINE_COL = 0;
const SCATTER_COL = 1;
const AREA_COL = 2;
const BAR_COL = 3;
const STYLE_COL = 5;

const styleMapping: Record<string, SerieStyle> = {
  Low: {
    color: 'red',
    dash: [2, 2],
  },
  Medium: {
    color: 'blue',
  },
  High: {
    dash: [8, 8],
  },
};

chart.config = {
  cursor: true,
  selection: {
    orientation: 'both',
  },
  xAxis: {
    cursorFormat: '.0f',
    // ratio: 0,
  },
  yAxes: {
    left: {
      min: 0,
      max: 200,
      format: '.2s',
    },
    right: {
      position: 'right',
    },
  },
  table,
  series: [
    {
      title: 'Custom',
      type: 'line',
      curve: 'step-after',
      yAxis: 'left',
      yCol: LINE_COL,
      width: 4,
      styleCol: STYLE_COL,
      styleMapping: (v) => styleMapping[v.key],
    },
    {
      type: 'line+scatter',
      yAxis: 'left',
      plotRadius: 3,
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
      hideInTooltip: true,
    },
  ],
};

// eslint-disable-next-line no-inner-declarations
async function randomize() {
  const table = await greycat.default.call<core.Table>('project::chart', [+nbRows.value]);
  console.log({ table });
  chart.config.table = table;
  chart.compute();
  chart.update();
}

chart.addEventListener('selection', (ev) => {
  console.log('selection', ev.detail);
});

chart.addEventListener('reset-selection', () => {
  console.log('reset-selection');
});
