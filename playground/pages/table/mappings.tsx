import '@/common';
import { core, GreyCat, type GuiTable } from '@greycat/sdk/web';

const greycat = await GreyCat.init();
const { actions } = await import('./actions');

const tableEl = (<gui-table headers={['Time', 'KLine']} />) as GuiTable;

async function fetchTable() {
  const table = await greycat.call<core.Table>('project::serie_of_obj');
  return tableEl.applyMappings(table);
}

function resetMappings() {
  tableEl.mappings = [];
}

fetchTable();

document.body.appendChild(
  <app-layout title="Table (mappings)">
    {actions}
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 'var(--spacing)',
        height: '100%',
      }}
    >
      <div className="row">
        <sl-button onclick={fetchTable}>Reload</sl-button>
        <sl-button onclick={resetMappings}>Reset mappings</sl-button>
      </div>
      {tableEl}
    </div>
  </app-layout>,
);
