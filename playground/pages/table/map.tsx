import { GreyCat, IndexedDbCache, TableLike } from '@greycat/web';
import '@/common';
import { actions } from './actions';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (map)">
    {actions}
    <gui-table
      value={await greycat.default.call<TableLike>('project::mapTest')}
      columnFactories={{ 1: 'gui-object' }}
      ontable-click={(ev) => {
        console.log(ev.detail);
      }}
    />
  </app-layout>,
);
