import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import { actions } from './actions';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table">
    {actions}
    <gui-table
      value={await greycat.default.call('project::table')}
      onrowupdate={(el, row) => {
        const klass = row[2].value as string;
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
        }
      }}
      ontable-dblclick={(ev) => {
        window.alert(
          `Col ${ev.detail.colIdx}, Row ${ev.detail.rowIdx}, Value "${
            ev.detail.row[ev.detail.colIdx].value
          }"`,
        );
      }}
      globalFilter
    />
  </app-layout>,
);
