import { appLayout } from '~/common';
import { GuiTable, TableLike } from '@greycat/web';

await gc.sdk.init({ debug: true });

const { actions } = await import('./actions');

const table = (
  <gui-table
    globalFilter
    drawerEnabled
    value={(await gc.project.persons()) as TableLike}
    columns={[
      { index: gc.project.Person2.$fields.id, filterable: false, hide: true },
      { index: gc.project.Person2.$fields.age, filterable: false },
      { index: gc.project.Person2.$fields.name, filterable: false },
      { index: gc.project.Person2.$fields.children, filterable: false },
    ]}
    // style={{ height: '250px' }}
  />
) as GuiTable;

const debug = document.createElement('gui-object');
table.addEventListener('gui-table-debug', (ev) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debug.value = (ev as any).detail;
});

document.body.appendChild(
  appLayout({ title: 'Table (array of objects)', mainStyle: { display: 'flex', gap: 'var(--spacing)', flexDirection: 'column' } },
    actions,
    table,
    debug,
  ),
);
