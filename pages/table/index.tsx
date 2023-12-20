import { core } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Table';
await app.init();

document.body.prepend(app);

app.actions.prepend(
  <li>
    <a
      href="#"
      onclick={async () => {
        tableEl.table = await greycat.default.call<core.Table>('project::table');
      }}
    >
      Randomize
    </a>
  </li>,
);

const tableEl = document.createElement('gui-table');
const table = await greycat.default.call<core.Table>('project::table');

tableEl.table = table;
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

tableEl.addEventListener('table-dblclick', (ev) => {
  window.alert(
    `Col ${ev.detail.colIdx}, Row ${ev.detail.rowIdx}, Value "${
      ev.detail.row[ev.detail.colIdx].value
    }"`,
  );
});

app.main.appendChild(
  <article style={{ display: 'grid', gridTemplateRows: 'auto 1fr' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      project::table
      <div>
        <gui-searchable-select
          placeholder="Search a timezone"
          selected="UTC"
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
    {tableEl}
  </article>,
);
