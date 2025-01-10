import { GreyCat } from '@greycat/sdk/web';
import '@/common';

await GreyCat.init();

document.body.appendChild(
  <app-layout title="Users" mainStyle={{ display: 'grid' }}>
    <gui-users />
  </app-layout>,
);
