import { GreyCat, IndexedDbCache, TableLike, $ } from '@greycat/web';
import '@/common';
import { actions } from './actions';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (map)">
    {actions}
    <gui-table
      value={await $.default.call<TableLike>('project::mapTest')}
      columnFactories={{ 1: 'gui-object' }}
      ontable-click={(ev) => {
        console.log(ev.detail);
      }}
    />
  </app-layout>,
);
