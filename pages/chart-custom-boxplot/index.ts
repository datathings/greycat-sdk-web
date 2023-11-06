import '../layout';
import { ChartConfig } from '../../src';
import { BoxPlotCanvas, BoxPlotOptions } from '../../src/chart-utils';
import { util } from '@greycat/sdk';

const app = document.createElement('app-layout');
app.title = 'Chart (custom boxplot)';
await app.init();

document.body.prepend(app);

const boxplot = await greycat.default.call<util.BoxPlotFloat>('project::boxplot_float');

const chart1 = document.createElement('gui-chart');
chart1.style.height = '80vh';
chart1.style.width = '100%';
chart1.style.margin = 'auto';
const chart2 = document.createElement('gui-chart');
chart2.style.height = '80vh';
chart2.style.width = '100%';
chart2.style.margin = 'auto';

chart1.config = {
  table: { cols: [[]] },
  series: [
    {
      type: 'custom',
      yAxis: 'left',
      yCol: 0,
      hideInTooltip: true,
      draw(ctx, s, xScale, yScale) {
        const boxPlotCanvas: BoxPlotCanvas = {
          max: yScale(boxplot.max),
          median: yScale(boxplot.percentile50),
          min: yScale(boxplot.min),
          q1: yScale(boxplot.percentile25),
          q3: yScale(boxplot.percentile75),
          crossValue: xScale(5),
        };

        const boxPlotOptions: BoxPlotOptions = {
          width: 200,
          iqrColor: s.color,
          whiskerColor: s.color,
          medianColor: s.color,
          orientation: 'vertical',
        };

        ctx.boxPlot(boxPlotCanvas, boxPlotOptions);
      },
    },
  ],
  xAxis: {
    scale: 'linear',
    min: 0,
    max: 10,
    hook(axis) {
      axis.ticks(0);
    },
  },
  yAxes: {
    left: {
      min: boxplot.min,
      max: boxplot.max,
    },
  },
  selection: false,
  cursor: false,
} satisfies ChartConfig;
chart2.config = {
  table: { cols: [[]] },
  series: [
    {
      type: 'custom',
      yAxis: 'left',
      yCol: 0,
      hideInTooltip: true,
      draw(ctx, s, xScale, yScale) {
        const boxPlotCanvas: BoxPlotCanvas = {
          max: xScale(boxplot.max),
          median: xScale(boxplot.percentile50),
          min: xScale(boxplot.min),
          q1: xScale(boxplot.percentile25),
          q3: xScale(boxplot.percentile75),
          crossValue: yScale(5),
        };

        const boxPlotOptions: BoxPlotOptions = {
          width: 200,
          iqrColor: s.color,
          whiskerColor: s.color,
          medianColor: s.color,
          orientation: 'horizontal',
        };

        ctx.boxPlot(boxPlotCanvas, boxPlotOptions);
      },
    },
  ],
  xAxis: {
    scale: 'linear',
    min: boxplot.min,
    max: boxplot.max,
  },
  yAxes: {
    left: {
      min: 0,
      max: 10,
      hook(axis) {
        axis.ticks(0);
      },
    },
  },
  selection: false,
  cursor: false,
} satisfies ChartConfig;

app.main.style.overflow = 'auto';
app.main.classList.add('grid');
app.main.replaceChildren(chart1, chart2);
