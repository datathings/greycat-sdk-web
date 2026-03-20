import { type GuiGauge } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const gauge = (<gui-gauge value={0} />) as GuiGauge;

setInterval(() => {
  if (gauge.value < 100) {
    gauge.value += 1;
  } else {
    gauge.value = 0;
  }
}, 100);

document.body.appendChild(appLayout('Gauge', gauge));
