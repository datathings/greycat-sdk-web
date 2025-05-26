import { GuiFactory } from '@greycat/web';
import '~/common';

await gc.sdk.init();

const reader = new gc.io.CsvReader("files/1/log.csv");
const table = await gc.io.CsvReader.sample(reader);
table.headers = ['Level', 'Time', 'Type', 'User', 'Task/Req', 'Tag', 'Context', 'Data'];
console.log(table);

document.body.appendChild(
  <app-layout title="Logs">
    <gui-table
      value={table}
      columnsWidths={[100, 250, 100, 100, 120, 100, 200]}
      columnFactory={{
        1: GuiFactory.defineFromFn((v) => <gui-value value={gc.core.time.create(v)} />),
      }}
      globalFilter
    />
  </app-layout>,
);
