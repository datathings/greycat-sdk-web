import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const { actions } = await import('./actions');

document.body.appendChild(
  appLayout('Table',
    actions,
    /* from a Table */
    <gui-table value={await gc.project.table()} />,

    /* from an Array */
    <gui-table
      value={gc.core.Table.fromRows([
        ['a', 0],
        ['b', 1],
        ['c', 2],
      ])}
    />,

    /* from an array of Objects */
    <gui-table
      value={gc.core.Table.fromObjects([
        { a: 'a', v: 0 },
        { b: 'a', v: 1 },
        { c: 'a', v: 2 },
      ])}
    />,

    /* from a Map */
    <gui-table
      value={gc.core.Table.fromMap(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
        ]),
      )}
    />,
  ),
);
