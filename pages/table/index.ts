import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui

import '../../src/bundle';
import '../../src/css/full.css';

try {
  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const tableEl = document.querySelector('gui-table')!;
  tableEl.style.height = '500px';

  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });
  tableEl.table = table;

  tableEl.addEventListener('table-row-click', (ev) => {
    window.alert(`Row ${ev.detail.rowIdx}, Col ${ev.detail.colIdx}`);
  });

} catch (err) {
  console.error(err);
  document.body.textContent = `Is GreyCat started?`;
}

