import { GreyCat, IndexedDbCache, $, core } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

const table = await $.default.call<core.Table>('project::table');
console.log(table);

document.body.appendChild(
  <app-layout title="Table">
    {actions}
    <gui-table
      value={table}
      onrowupdate={(el, row) => {
        const klass = table.cols[2][row] as string;
        switch (klass) {
          case 'low':
            (el.children[1] as HTMLElement).style.color = 'cyan';
            break;
          case 'normal':
            (el.children[1] as HTMLElement).style.color = 'lightgreen';
            break;
          case 'high':
            (el.children[1] as HTMLElement).style.color = 'orange';
            break;
          default:
            (el.children[1] as HTMLElement).style.color = 'unset';
            break;
        }
      }}
      ongui-dblclick={(ev) => {
        const { rowIdx, colIdx } = ev.detail;
        window.alert(`Col ${colIdx}, Row ${rowIdx}, Value "${table.cols[colIdx][rowIdx]}"`);
      }}
      globalFilter
    />
  </app-layout>,
);
