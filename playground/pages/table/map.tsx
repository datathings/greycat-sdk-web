import '@greycat/web';
import '@/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Table">
    {/* from a Table */}
    <gui-table value={await gc.project.table()} />

    {/* from an Array */}
    <gui-table
      value={gc.core.Table.fromRows([
        ['a', 0],
        ['b', 1],
        ['c', 2],
      ])}
    />

    {/* from an array of Objects */}
    <gui-table
      value={gc.core.Table.fromObjects([
        { a: 'a', v: 0 },
        { b: 'a', v: 1 },
        { c: 'a', v: 2 },
      ])}
    />

    {/* from a Map */}
    <gui-table
      value={gc.core.Table.fromMap(
        new Map([
          ['a', 0],
          ['b', 1],
          ['c', 2],
        ]),
      )}
    />
  </app-layout>,
);
