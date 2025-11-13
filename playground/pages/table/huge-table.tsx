import '@greycat/web';
import '~/common';

await gc.sdk.init({ debug: true });

const layoutEl = document.createElement('app-layout');
layoutEl.title = 'Table (huge)';

const tableEl = document.createElement('gui-table');
layoutEl.appendChild(tableEl);

document.body.appendChild(layoutEl);

gc.project.sample_huge_csv().then((table) => {
  if (table === null) {
    return;
  }
  tableEl.value = table;
});
