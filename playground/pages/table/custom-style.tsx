import '@greycat/web';
import '~/common';
import './custom-style.css';

await gc.sdk.init();
const { actions } = await import('./actions');

const table = [
  { Ident: '189927-1', Type: 'MTS', Voltage: '20 kV (MV)', ' ': undefined },
  { Ident: '142686-1', Type: 'MTS', Voltage: '15 kV (MV)', ' ': undefined },
  { Ident: '192771-1', Type: 'BTS', Voltage: '7 kV (MV)', ' ': undefined },
];

const tableEl = document.createElement('gui-table');
tableEl.classList.add('sl-theme-light', 'custom-style');
tableEl.setAttrs({
  globalFilter: true,
  value: table,
  rowHeight: 40,
  useDefaultColumns: true,
  columns: [
    { index: 0, filterable: false },
    { index: 1, filterable: false },
    { index: 2, filterable: false },
    {
      index: 3,
      filterable: false,
      cell: (_, rowIdx) => {
        return (
          <sl-icon-button
            name="eye"
            label="Details"
            onclick={() => {
              window.alert(`Show details: ${table[rowIdx].Ident}`);
            }}
          />
        );
      },
    },
  ],
});

document.body.appendChild(
  <app-layout title="Table (custom-style)">
    {actions}
    {tableEl}
  </app-layout>,
);
