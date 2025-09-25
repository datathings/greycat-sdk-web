import '@greycat/web';
import type { GuiObject, GuiTable, sl } from '@greycat/web';
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
table.columnFactory = {
  3: (_, rowIdx) => {
    const link = document.createElement('a');
    link.textContent = 'Details';
    link.onclick = () => {
      details.value = entries[rowIdx];
      drawer.show();
    };
    return link;
  },
};
