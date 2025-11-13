import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Users" mainStyle={{ display: 'grid' }}>
    <gui-users />
  </app-layout>,
);
