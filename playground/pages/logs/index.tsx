import { GuiFactory } from '@greycat/web';
import '@/common';

await gc.sdk.init();

const format = gc.io.CsvFormat.createFrom({
  separator: ',',
  columns: null,
  columns_size: null,
  decimal_separator: null,
  header_lines: null,
  string_delimiter: null,
  thousands_separator: null,
});
const table = await gc.io.CsvFormat.sample('files/1/log.csv', format, null, 1000);
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
