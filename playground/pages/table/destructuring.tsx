import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const table = await gc.project.destructuring_table();

document.body.appendChild(
  appLayout('Table (destructuring)', <gui-table value={table} drawerEnabled />),
);
