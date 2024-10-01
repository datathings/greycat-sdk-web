import { GreyCat, IndexedDbCache } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Roles" mainStyle={{ display: 'flex', flexDirection: 'column' }}>
    <gui-roles />
  </app-layout>,
);
