import { GreyCat, IndexedDbCache, BoxPlotCanvas, BoxPlotOptions, util } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const boxplot = await greycat.default.call<util.BoxPlotFloat>('project::boxplot_float');

document.body.appendChild(
  <app-layout title="Chart (custom boxplot)">
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
      }}
    >
      <gui-chart
        value={{ cols: [[]] }}
        config={{
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
        }}
      />

      <gui-chart
        value={{ cols: [[]] }}
        config={{
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
              ticks: [],
            },
          },
          selection: false,
          cursor: false,
        }}
      />
    </div>
  </app-layout>,
);
