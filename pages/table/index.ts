import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../src';

const app = document.getElementById('app') as HTMLDivElement;

try {
  const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const tableEl = document.createElement('gui-table');
  tableEl.style.height = '500px';
  app.appendChild(tableEl);

  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });
  tableEl.table = table;

  tableEl.addEventListener('table-row-click', (ev) => {
    window.alert(`Row ${ev.detail.rowIdx}, Col ${ev.detail.colIdx}`);
  });

} catch (err) {
  app.textContent = `Is GreyCat started?`;
}

