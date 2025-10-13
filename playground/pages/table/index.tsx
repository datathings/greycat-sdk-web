import { getGlobalNumberFormat } from '@greycat/web';
import '~/common';

await gc.sdk.init();

const { actions } = await import('./actions');

const table = await gc.project.table();
console.log(table);

document.body.appendChild(
  <app-layout title="Table">
    {actions}
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
          cell: ({ value, row, container }) => {
            const klass = table.cols[2][row] as 'low' | 'normal' | 'high';
            switch (klass) {
              case 'low':
                container.style.color = 'cyan';
                break;
              case 'normal':
                container.style.color = 'lightgreen';
                break;
              case 'high':
                container.style.color = 'orange';
                break;
              default:
                container.style.color = 'unset';
                break;
            }
            if (value === null) {
              return <code>null</code>;
            }
            return document.createTextNode(getGlobalNumberFormat().format(value));
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
    />
  </app-layout>,
);
