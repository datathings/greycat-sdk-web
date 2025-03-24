import { type GuiGauge } from '@greycat/web';
import '~/common';

await gc.sdk.init();

const gauge = (<gui-gauge value={0} />) as GuiGauge;

setInterval(() => {
  if (gauge.value < 100) {
    gauge.value += 1;
  } else {
    gauge.value = 0;
  }
}, 100);

document.body.appendChild(<app-layout title="Gauge">{gauge}</app-layout>);
