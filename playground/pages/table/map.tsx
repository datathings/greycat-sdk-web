import { GreyCat, IndexedDbCache, TableLike, $ } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

document.body.appendChild(
  <app-layout title="Table (map)">
    {actions}
    <gui-table
      value={await $.default.call<TableLike>('project::mapTest')}
      columnFactory={{ 1: 'gui-object' }}
      ongui-click={(ev) => {
        console.log(ev.detail);
      }}
    />
  </app-layout>,
);
