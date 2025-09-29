import '@greycat/web';
import '~/common';
import './custom-style.css';
import { toast } from '@greycat/web';

await gc.sdk.init();
const { actions } = await import('./actions');

let earthquakes: gc.heatmap.Earthquake[] = [];
try {
  earthquakes = await gc.heatmap.all_earthquakes();
} catch (err) {
  toast.error(err);
}

document.body.appendChild(
  <app-layout title="Table (table2)">
    {actions}
    <gui-table2 value={earthquakes} />
  </app-layout>,
);
