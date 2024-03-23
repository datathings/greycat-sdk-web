import * as d3 from 'd3';
import { GreyCat, IndexedDbCache, PrimitiveType, core, std_n } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const tableEl = document.createElement('gui-table');
const table = await greycat.default.call<core.Table>('project::table');

tableEl.value = table;
tableEl.onrowupdate = (el, row) => {
  const klass = row[2].value as string;
  switch (klass) {
    case 'low':
      (el.children[1] as HTMLElement).style.color = 'cyan';
      break;
    case 'normal':
      (el.children[1] as HTMLElement).style.color = 'lightgreen';
      break;
    case 'high':
      (el.children[1] as HTMLElement).style.color = 'orange';
      break;
  }
};
// tableEl.filter = "low";
// tableEl.filterColumn = 2;

tableEl.addEventListener('table-dblclick', (ev) => {
  window.alert(
    `Col ${ev.detail.colIdx}, Row ${ev.detail.rowIdx}, Value "${
      ev.detail.row[ev.detail.colIdx].value
    }"`,
  );
});

document.body.appendChild(
  <app-layout title="Table">
    <>
      <a
        slot="action"
        href=""
        onclick={async (ev) => {
          ev.preventDefault();
          tableEl.value = await greycat.default.call<core.Table>('project::table');
        }}
      >
        Randomize
      </a>
      <a
        slot="action"
        href=""
        onclick={(ev) => {
          ev.preventDefault();
          if (tableEl.value) {
            const newCol = Array.from({ length: tableEl.value.cols?.[0].length ?? 0 }).map(
              d3.randomInt(1000),
            );
            tableEl.value.cols?.push(newCol);
            tableEl.value.meta?.push(
              new std_n.core.NativeTableColumnMeta(
                greycat.default.abi,
                PrimitiveType.int,
                greycat.default.abi.type_by_fqn.get('core::int')!.mapped_type_off,
                false,
                `Column ${tableEl.value.cols?.length}`,
              ),
            );
            tableEl.computeTable();
            tableEl.update();
          }
        }}
      >
        Add column
      </a>
      <a
        slot="action"
        href=""
        onclick={(ev) => {
          ev.preventDefault();
          tableEl.fitColumnsToHeaders();
        }}
      >
        Fit Columns
      </a>
      <a
        slot="action"
        href=""
        onclick={(ev) => {
          ev.preventDefault();
          tableEl.resetColumnsWidth();
        }}
      >
        Reset Columns
      </a>
    </>
    <article style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        project::table
        <div>
          <gui-searchable-select
            placeholder="Search a timezone"
            value="UTC"
            options={core.TimeZone.$fields().map((en) => ({
              text: en.value as string,
              value: en.value as string,
            }))}
            onsearchable-select-change={(ev) => {
              tableEl.cellProps = (_, value) => ({
                value,
                dateFmt: new Intl.DateTimeFormat('fr-FR', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZone: ev.detail as string,
                  timeZoneName: 'longOffset',
                }),
              });
              tableEl.update();
            }}
            style={{ fontWeight: 'normal' }}
          />
        </div>
      </header>
      <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <input
          type="search"
          placeholder="Filter on every column"
          oninput={(ev) => {
            tableEl.filter = (ev.target as HTMLInputElement).value;
          }}
          style={{ marginBottom: '0', borderRadius: '0' }}
        />
        {tableEl}
      </div>
    </article>
  </app-layout>,
);
