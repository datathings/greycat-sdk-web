import '@/common';
import { $, GreyCat, IndexedDbCache } from '@greycat/web';
import { actions } from './actions';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (array of objects)" mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}>
    {actions}
    <gui-table value={await $.default.call('project::persons')} />
  </app-layout>,
);
