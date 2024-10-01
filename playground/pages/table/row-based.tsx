import '@/common';
import { GreyCat, IndexedDbCache } from '@greycat/web';
import { actions } from './actions';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (row-based)" mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}>
    {actions}
    <gui-table
      value={{
        rows: [
          ['John', 42, 2],
          ['Michel', 42, 4],
          ['Max', 35, 0],
        ],
        meta: ['Name', { header: 'Age' }, 'Children'],
      }}
    />
  </app-layout>,
);
