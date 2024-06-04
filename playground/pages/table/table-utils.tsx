import '@/common';
import { GreyCat, IndexedDbCache } from '@greycat/web';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table - utils">
    <gui-table
      style={{ backgroundColor: 'var(--bg-1)' }}
      value={{
        rows: [
          ['John', 42, 2],
          ['Michel', 42, 4],
          ['Max', 35, 0],
        ],
        meta: ['Name', { header: 'Age' }, 'Children'],
      }}
    />

    <gui-table
      style={{ backgroundColor: 'var(--bg-1)' }}
      value={await greycat.default.call('project::persons')}
    />
  </app-layout>,
);
