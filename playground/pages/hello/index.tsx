import { GreyCat } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

const table = await greycat.call('project::persons');
console.log(table);

document.body.appendChild(
  <app-layout title="Hello">
    <gui-table value={table} />
  </app-layout>,
);

// kopr.io/map-v2/
