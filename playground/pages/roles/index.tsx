import '@greycat/web';
import '@/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Roles" mainStyle={{ display: 'flex', flexDirection: 'column' }}>
    <gui-roles />
  </app-layout>,
);
