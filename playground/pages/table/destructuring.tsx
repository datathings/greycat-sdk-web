import '@greycat/web';
import '~/common';

await gc.sdk.init();

const table = await gc.project.destructuring_table();

document.body.appendChild(
  <app-layout title="Table (destructuring)">
    <gui-table value={table} drawerEnabled />
  </app-layout>
);