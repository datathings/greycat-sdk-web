import '../layout';
import data from './data.json';
import { ChartConfig } from '../../src';
import { BoxPlotCanvas, BoxPlotOptions } from '../../src/chart-utils';

const app = document.createElement('app-layout');
app.title = 'Chart (custom)';
await app.init();

document.body.prepend(app);

const chart1 = document.createElement('gui-chart');
chart1.style.height = '80vh';
chart1.style.width = '75%';
chart1.style.margin = 'auto';
chart1.config = {
  table: { cols: [[]] },
  series: [
    {
      type: 'custom',
      yAxis: 'left',
      yCol: 0,
      hideInTooltip: true,
      draw(ctx, s, xScale, yScale) {
        const width = 200;
        const boxPlotCanvas: BoxPlotCanvas = {
          max: yScale(data.boxplot.max),
          median: yScale(data.boxplot.percentile50),
          min: yScale(data.boxplot.min),
          q1: yScale(data.boxplot.percentile25),
          q3: yScale(data.boxplot.percentile75),
          x: xScale(5),
        };

        const boxPlotOptions: BoxPlotOptions = {
          width: width,
          iqrColor: s.color,
          whiskerColor: s.color,
          medianColor: s.color,
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
      min: data.boxplot.min,
      max: data.boxplot.max,
    },
  },
  cursor: false,
} satisfies ChartConfig;

app.main.style.overflow = 'auto';
app.main.replaceChildren(chart1);
