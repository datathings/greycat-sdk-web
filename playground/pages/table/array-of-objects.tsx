import '@/common';
import { $, GreyCat, GuiTable, IndexedDbCache } from '@greycat/sdk/web';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

const table = (
  <gui-table
    globalFilter
    value={await $.default.call('project::persons')}
    style={{ height: '250px' }}
  />
) as GuiTable;

const debug = document.createElement('gui-object');
table.addEventListener('gui-table-debug', (ev) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug.value = (ev as any).detail;
});

document.body.appendChild(
  <app-layout
    title="Table (array of objects)"
    mainStyle={{ display: 'flex', gap: 'var(--spacing)', flexDirection: 'column' }}
  >
    {actions}
    {table}
    {debug}
  </app-layout>,
);
