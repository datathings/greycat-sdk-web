import { core } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Chart';
await app.init();

document.body.prepend(app);

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

const LINE_COL = 0;
const SCATTER_COL = 1;
const AREA_COL = 2;
const BAR_COL = 3;
const LINE_TYPE_COL = 4;
const LINE_COLOR_COL = 5;

const chart = document.createElement('gui-chart');
app.main.replaceChildren(chart);

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
    // ratio: 0,
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
      title: 'Custom',
      type: 'line',
      curve: 'step-after',
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
