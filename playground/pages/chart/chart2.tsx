import { type GuiChart2 } from '@greycat/web';
import '../layout';
import './chart2.css';

const app = document.createElement('app-layout');
app.title = 'Chart2';
await app.init();

document.body.prepend(app);

const chart = (
  <gui-chart2
    value={await greycat.default.call('project::table')}
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

app.addSimpleAction('Download as PNG', () => chart.downloadAsImage());

app.main.replaceChildren(chart);
