import '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init({ debug: true });
const { actions } = await import('./actions');

const root = await greycat.root();
const earthquakes_by_time = root[
  'heatmap::earthquakes_by_time'
] as gc.core.nodeTime<gc.heatmap.Earthquake>;
const table = await gc.core.nodeTime.sample(
  [earthquakes_by_time],
  null,
  null,
  1000,
  gc.core.SamplingMode.adaptative,
  null,
  null,
);

const tableEl = document.createElement('gui-table');
tableEl.drawerEnabled = true;
tableEl.useDefaultColumns = true;
tableEl.columns = [{ index: 0, width: 150 }];
tableEl.value = table;

const mappings = document.createElement('gui-table-mappings');
mappings.table = tableEl.table;

const object = document.createElement('gui-object');
object.expanded = true;
object.value = mappings.value;

mappings.addEventListener('gui-table-mappings-apply', (ev) => {
  console.log('apply mappings', ev.detail);
  object.value = ev.detail;
  tableEl.mappings = ev.detail;
  tableEl.applyMappings();
});

document.body.appendChild(
  <app-layout
    title="Table (config)"
    mainStyle={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing)' }}
  >
    {actions}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 'var(--spacing)' }}>
      {mappings}
      {object}
    </div>
    {tableEl}
  </app-layout>,
);
