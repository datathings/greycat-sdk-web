import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import { books } from '@/common/data';
import { actions } from './actions';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (columnFactories)">
    {actions}
    <gui-table value={{ cols: [books], meta: ['Book'] }} columnFactories={{ 0: 'gui-object' }} />
  </app-layout>,
);
