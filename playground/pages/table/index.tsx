import type { CellValueData } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({
  debug: true,
  numFmt: new Intl.NumberFormat(undefined, { maximumFractionDigits: 3 }),
});

const { actions } = await import('./actions');

const table = await gc.project.table();
console.log(table);

document.body.appendChild(
  appLayout('Table',
    actions,
    <gui-table
      value={table}
      globalFilter
      drawerEnabled
      useDefaultColumns
      columns={[
        {
          index: 0,
          header: 'Time',
        },
        {
          index: 1,
          value: ({ value, container, row }: CellValueData<number | bigint | null>) => {
            switch (table.cols[2][row] as 'low' | 'normal' | 'high') {
              case 'low':
                container.style.color = 'cyan';
                return value;
              case 'normal':
                container.style.color = 'lightgreen';
                return value;
              case 'high':
                container.style.color = 'orange';
                return value;
              default:
                container.style.color = 'var(--text-muted)';
                return 'N/A';
            }
          },
        },
        {
          index: 2,
          header: 'Class',
        },
      ]}
      ongui-table-dblclick={(ev) => {
        const { rowIdx, colIdx } = ev.detail;
        window.alert(`Col ${colIdx}, Row ${rowIdx}, Value "${table.cols[colIdx][rowIdx]}"`);
      }}
    />,
  ),
);
