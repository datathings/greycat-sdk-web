import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

// temperature (°C) and humidity (%) over 100 hours
const N = 100;
const times: Date[] = [];
const temp: number[] = [];
const humidity: number[] = [];
const base = new Date('2024-06-01').getTime();
for (let i = 0; i < N; i++) {
  times.push(new Date(base + i * 3600_000));
  temp.push(20 + Math.sin(i / 12) * 8 + Math.random() * 2);
  humidity.push(50 + Math.cos(i / 10) * 20 + Math.random() * 5);
}

const table = gc.core.Table.fromCols([times, temp, humidity]);
table.headers = ['time', 'temperature', 'humidity'];

document.body.appendChild(
  <app-layout title="Chart2 — Multi-Axis">
    <gui-chart2
      value={table}
      config={{
        xCol: 0,
        xAxis: { type: 'time' },
        yAxis: [
          { name: 'Temp (°C)', position: 'left' },
          { name: 'Humidity (%)', position: 'right' },
        ],
        series: [
          { type: 'line', yCol: 1, yAxisIndex: 0, title: 'Temperature' },
          { type: 'line', yCol: 2, yAxisIndex: 1, title: 'Humidity', color: '#ff9f43' },
        ],
        tooltip: { enabled: true, trigger: 'axis' },
        legend: { enabled: true },
        dataZoom: { enabled: true, type: 'inside' },
      }}
    />
  </app-layout>,
);
