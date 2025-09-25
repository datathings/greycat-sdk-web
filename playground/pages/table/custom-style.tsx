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

document.body.appendChild(
  <app-layout title="Table (custom-style)">
    {actions}
    <gui-table
      className={['sl-theme-light', 'custom-style']}
      globalFilter
      value={table}
      rowHeight={40}
      columnFactory={{
        3: (_, rowIdx) => {
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
      }}
    />
  </app-layout>,
);
