import { GreyCat, IndexedDbCache, type GuiChart2 } from '@greycat/web';
import '@/common';
import './index.css';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const chart = (
  <gui-chart2
    value={await greycat.call('project::table')}
    config={{
      cursor: true,
      xAxis: {
        scale: 'time',
      },
      yAxes: {
        left: {},
      },
      series: [
        {
          type: 'line',
          xCol: 0,
          yCol: 1,
          yAxis: 'left',
        },
        // {
        //   type: 'line',
        //   yCol: 2,
        //   yAxis: 'left',
        // },
        // {
        //   type: 'area',
        //   yCol: 1,
        //   yCol2: 2,
        //   yAxis: 'left',
        // },
        // {
        //   type: 'bar',
        //   yCol: 3,
        //   yAxis: 'left',
        //   color: 'orange',
        //   width: 10,
        // }
      ],
    }}
  />
) as GuiChart2;

document.body.appendChild(
  <app-layout title="Chart 2">
    <>
      <a slot="action" href="#" onclick={() => chart.downloadAsImage()}>
        Download as PNG
      </a>
    </>
    {chart}
  </app-layout>,
);
