import * as d3 from 'd3';
import { ChartConfig, GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import data from './data.json';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = document.createElement('gui-chart');
chart.style.height = '80vh';
chart.style.width = '50%';
chart.style.margin = 'auto';
chart.value = { cols: [[]] };
chart.config = {
  series: [
    {
      type: 'custom',
      yAxis: 'left',
      yCol: 0,
      hideInTooltip: true,
      draw(ctx, s, xScale, yScale) {
        const histo = data.histogram.cols;
        const max = data.histogram.meta[2].max;
        ctx.ctx.fillStyle = s.color;
        ctx.ctx.globalAlpha = 0.2;
        const curve = d3.curveCatmullRom(ctx.ctx);
        curve.lineStart();

        curve.point(xScale(5), yScale(histo[0][0]));
        for (let index = 0; index < histo[0].length; index++) {
          const y2 = yScale(histo[1][index]);
          const width = (5 * histo[2][index]) / max;
          curve.point(xScale(5 + width), y2);
        }
        curve.lineEnd();
        ctx.ctx.lineTo(xScale(5), yScale(histo[1][histo[0].length - 1]));
        ctx.ctx.moveTo(xScale(5), yScale(histo[0][0]));
        ctx.ctx.fill();

        ctx.ctx.beginPath();
        curve.lineStart();
        curve.point(xScale(5), yScale(histo[0][0]));
        ctx.ctx.fillStyle = s.color;
        for (let index = 0; index < data.histogram.cols[0].length; index++) {
          const y2 = yScale(histo[1][index]);
          const width = (5 * histo[2][index]) / max;
          curve.point(xScale(5 - width), y2);
        }
        curve.lineEnd();
        ctx.ctx.lineTo(xScale(5), yScale(histo[1][histo[0].length - 1]));
        ctx.ctx.moveTo(xScale(5), yScale(histo[0][0]));
        ctx.ctx.fill();
      },
    },
    {
      type: 'custom',
      yAxis: 'left',
      yCol: 0,
      hideInTooltip: true,
      draw(ctx, s, xScale, yScale) {
        const boxPlot = {
          max: yScale(data.boxplot.max),
          median: yScale(data.boxplot.percentile50),
          min: yScale(data.boxplot.min),
          q1: yScale(data.boxplot.percentile25),
          q3: yScale(data.boxplot.percentile75),
          x: xScale(5),
        };
        const width = 20;
        ctx.ctx.strokeStyle = s.color;
        ctx.ctx.fillStyle = s.color;
        ctx.ctx.globalAlpha = 1;
        ctx.ctx.save();
        ctx.ctx.beginPath();

        // Whisker
        ctx.ctx.moveTo(boxPlot.x, boxPlot.min);
        ctx.ctx.lineTo(boxPlot.x, boxPlot.max);
        // min
        ctx.ctx.moveTo(boxPlot.x - width / 2, boxPlot.min);
        ctx.ctx.lineTo(boxPlot.x + width / 2, boxPlot.min);
        // max
        ctx.ctx.moveTo(boxPlot.x - width / 2, boxPlot.max);
        ctx.ctx.lineTo(boxPlot.x + width / 2, boxPlot.max);
        ctx.ctx.stroke();
        ctx.ctx.closePath();

        // IQR
        ctx.ctx.beginPath();
        ctx.ctx.lineWidth = 2;
        ctx.ctx.fillRect(boxPlot.x - width / 2, boxPlot.q3, width, boxPlot.q1 - boxPlot.q3);
        ctx.ctx.globalAlpha = 1;
        ctx.ctx.strokeRect(boxPlot.x - width / 2, boxPlot.q3, width, boxPlot.q1 - boxPlot.q3);
        ctx.ctx.closePath();

        // Median
        ctx.ctx.beginPath();
        ctx.ctx.lineWidth = 2;
        ctx.ctx.strokeStyle = 'black';
        ctx.ctx.moveTo(boxPlot.x - width / 2, boxPlot.median);
        ctx.ctx.lineTo(boxPlot.x + width / 2, boxPlot.median);
        ctx.ctx.stroke();
        ctx.ctx.closePath();

        ctx.ctx.restore();
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

document.body.appendChild(<app-layout title="Chart (custom)">{chart}</app-layout>);
