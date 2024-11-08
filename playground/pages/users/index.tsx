import { GreyCat, IndexedDbCache, toast } from '@greycat/web';
import '@/common';

try {
  await GreyCat.init({
    cache: new IndexedDbCache('sdk-web-playground'),
  });
} catch (err) {
  toast.error(err);
}

document.body.appendChild(
  <app-layout title="Users" mainStyle={{ display: 'flex', flexDirection: 'column' }}>
    <gui-users />
  </app-layout>,
);
