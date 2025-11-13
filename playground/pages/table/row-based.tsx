import '~/common';
import '@greycat/web';

await gc.sdk.init({ debug: true });

const { actions } = await import('./actions');

const table = gc.core.Table.fromRows([
  ['John', 42, 2],
  ['Michel', 42, 4],
  ['Max', 35, 0],
]);
table.headers = ['Name', 'Age', 'Children'];
document.body.appendChild(
  <app-layout title="Table (row-based)" mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}>
    {actions}
    <gui-table value={table} globalFilter={true} filterColumns={['john']} />
  </app-layout>,
);
