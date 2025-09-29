import '@greycat/web';
import { toast } from '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init();
const { actions } = await import('./actions');

const root = await greycat.root();
const earthquakesByTime = root['heatmap::earthquakes_by_time'] as gc.core.nodeTime;
const table = await gc.core.nodeTime.sample(
  [earthquakesByTime],
  null,
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
);
const tableEl = document.createElement('gui-table');
tableEl.drawerEnabled = true;
tableEl.value = table;

setTimeout(async () => {
  try {
    const mappings = await table.inferMappings();
    tableEl.mappings = mappings;
    tableEl.applyMappings();
  } catch (err) {
    toast.error(err);
  }
}, 0);

document.body.appendChild(
  <app-layout title="Table (config)">
    {actions}
    {tableEl}
  </app-layout>,
);
