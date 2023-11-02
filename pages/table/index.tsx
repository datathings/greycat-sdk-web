import { type core } from '../../src';
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

const dateFmt = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', timeStyle: 'medium', dateStyle: 'medium' });

tableEl.cellProps = (_, value) => {
  return {
    value,
    dateFmt,
  };
};
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
    <header>project::table</header>
    {tableEl}
  </article>,
);
