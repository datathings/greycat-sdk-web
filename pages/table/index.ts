import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui

import '../../src/css/full.css';
import './index.css';
import '../../src/bundle';

try {
  const randomizeBtn = document.getElementById('randomize')!;

  const greycat = window.greycat.default = await GreyCat.init({ url: new URL('http://localhost:8080') });

  const tableEl = document.querySelector('gui-table')!;
  const table = await greycat.call<core.Table>('project::table');
  console.log({ table });
  tableEl.table = table;
  tableEl.onrowupdate = (el, row) => {
    const klass = row[2].value as string;
    switch (klass) {
      case 'low':
        (el.children[1] as HTMLElement).style.color = 'cyan';
        break;
      case 'normal':
        (el.children[1] as HTMLElement).style.color = '';
        break;
      case 'high':
        (el.children[1] as HTMLElement).style.color = 'orange';
        break;
    }
  };

  tableEl.addEventListener('table-row-click', (ev) => {
    window.alert(`Row ${ev.detail.rowIdx}, Col ${ev.detail.colIdx}`);
  });

  randomizeBtn.addEventListener('click', async () => {
    tableEl.table = await greycat.call<core.Table>('project::table');
  });

} catch (err) {
  console.error(err);
  document.body.textContent = `Is GreyCat started?`;
}

