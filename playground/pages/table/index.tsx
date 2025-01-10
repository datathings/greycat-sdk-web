import { IndexedDbCache, getGlobalNumberFormat } from '@greycat/sdk/web';
import '@/common';

await greycat.GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

const table = await greycat.project.table();
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
      ongui-dblclick={(ev) => {
        const { rowIdx, colIdx } = ev.detail;
        window.alert(`Col ${colIdx}, Row ${rowIdx}, Value "${table.cols[colIdx][rowIdx]}"`);
      }}
    />
  </app-layout>,
);
