import '@greycat/web';
import '@greycat/web/components/all.js';
import type { GuiObject, GuiTable } from '@greycat/web';
import type * as sl from '@shoelace-style/shoelace';
import '@greycat/web/greycat.css';

await gc.sdk.init();

const table = document.getElementById('table') as GuiTable;
const drawer = document.getElementById('drawer') as sl.SlDrawer;
const details = document.getElementById('details') as GuiObject;

const entries = [
  { Ident: '189927-1', Type: 'MTS', Voltage: '20 kV (MV)', ' ': undefined },
  { Ident: '142686-1', Type: 'MTS', Voltage: '15 kV (MV)', ' ': undefined },
];

table.rowHeight = 40;
table.value = entries;
table.columns = [
  {
    index: 3,
    cell: ({ row }) => {
      const link = document.createElement('a');
      link.textContent = 'Details';
      link.onclick = () => {
        details.value = entries[row];
        drawer.show();
      };
      return link;
    },
  },
];
