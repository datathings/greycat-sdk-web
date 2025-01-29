import { getGlobalNumberFormat } from '@greycat/web';
import '@/common';

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
      columnFactory={{
        1: (value: number | bigint | null, rowIdx: number, el) => {
          const klass = table.cols[2][rowIdx] as 'low' | 'normal' | 'high';
          switch (klass) {
            case 'low':
              el.style.color = 'cyan';
              break;
            case 'normal':
              el.style.color = 'lightgreen';
              break;
            case 'high':
              el.style.color = 'orange';
              break;
            default:
              el.style.color = 'unset';
              break;
          }
          if (value === null) {
            return <code>null</code>;
          }
          return document.createTextNode(getGlobalNumberFormat().format(value));
        },
      }}
      ongui-table-dblclick={(ev) => {
        const { rowIdx, colIdx } = ev.detail;
        window.alert(`Col ${colIdx}, Row ${rowIdx}, Value "${table.cols[colIdx][rowIdx]}"`);
      }}
    />
  </app-layout>,
);
