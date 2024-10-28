import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import { books } from '@/common/data';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

document.body.appendChild(
  <app-layout title="Table (columnFactories)">
    {actions}
    <gui-table headers={['Book']} value={{ cols: [books] }} defaultCellFactory="gui-object" />
  </app-layout>,
);
