import '@/common';
import { $, core, GreyCat, IndexedDbCache } from '@greycat/web';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

const table = await $.default.call<core.Table>('project::objects_table');

document.body.appendChild(
  <app-layout
    title="Table (array of objects)"
    mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}
  >
    {actions}
    <gui-table
      value={table}
      columnFactory={{
        0: 'gui-input-string',
        1: 'gui-input-number',
        2: 'gui-input-bool',
      }}
    />
  </app-layout>,
);
