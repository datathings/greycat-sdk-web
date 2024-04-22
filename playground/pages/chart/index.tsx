<<<<<<< HEAD:playground/pages/chart/index.tsx
import { GreyCat, type GuiChart, IndexedDbCache, type core } from '@greycat/web';
import '@/common';
=======
import { core } from '@greycat/sdk';
import '../layout';
import { SerieStyle } from '../../src';

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

const chart = document.createElement('gui-chart');
app.main.replaceChildren(chart);
>>>>>>> testing:pages/chart/index.tsx

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

<<<<<<< HEAD:playground/pages/chart/index.tsx
greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = (
  <gui-chart
    config={{
      table: await greycat.default.call<core.Table>('project::chart', [150]),
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
    }}
  />
) as GuiChart;

const nbRows = (
  <input
    slot="action"
    name="nb-rows"
    id="nb-rows"
    type="number"
    min="1"
    max="10000"
    value="150"
    oninput={randomize}
  />
) as HTMLInputElement;

document.body.appendChild(
  <app-layout title="Chart">
    <>
      {nbRows}
      <a slot="action" href="#" onclick={randomize}>
        Randomize
      </a>
      <a
        slot="action"
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
      <a
        slot="action"
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
      <a
        slot="action"
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
      <a
        slot="action"
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
      <a
        slot="action"
        href="#"
        onclick={() => {
          chart.config.cursor = !chart.config.cursor;
        }}
      >
        Toggle cursor
      </a>
    </>
    {chart}
  </app-layout>,
);
=======
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
>>>>>>> testing:pages/chart/index.tsx

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
