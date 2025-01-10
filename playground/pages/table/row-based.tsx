import '@/common';
import { GreyCat, IndexedDbCache } from '@greycat/sdk/web';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const { actions } = await import('./actions');

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
      }}
      headers={['Name', 'Age', 'Children']}
    />
  </app-layout>,
);
