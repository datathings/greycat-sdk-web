import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';
import { books } from '@/common/data';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Table (custom)">
    <gui-table value={{ cols: [books], meta: ['Book'] }} cellTagNames={{ 0: 'gui-object' }} />
  </app-layout>,
);
