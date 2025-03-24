import '@greycat/web';
import '~/common';
import { books } from '~/common/data';

await gc.sdk.init();

const { actions } = await import('./actions');

const table = gc.core.Table.create([books]);
table.headers = ['Book'];

document.body.appendChild(
  <app-layout title="Table (columnFactories)">
    {actions}
    <gui-table value={table} columnFactory={{ 0: 'gui-object' }} />
  </app-layout>,
);
