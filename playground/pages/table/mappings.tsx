import '@greycat/web';
import '~/common';

await gc.sdk.init();
const { actions } = await import('./actions');

const tableEl = document.createElement('gui-table');

async function fetchTable() {
  const table = (await gc.project.serie_of_obj()) as gc.Table;
  table.headers = ['Time', 'KLine'];
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
