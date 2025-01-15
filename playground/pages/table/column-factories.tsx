import '@greycat/web';
import '@/common';
import { books } from '@/common/data';

await gc.sdk.init();

const { actions } = await import('./actions');

document.body.appendChild(
  <app-layout title="Table (columnFactories)">
    {actions}
    <gui-table headers={['Book']} value={{ cols: [books] }} columnFactory={{ 0: 'gui-object' }} />
  </app-layout>,
);
