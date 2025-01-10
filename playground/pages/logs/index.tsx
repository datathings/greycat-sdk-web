import { core, GreyCat, GuiFactory, IndexedDbCache, io } from '@greycat/sdk/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const format = io.CsvFormat.createFrom({
  separator: ',',
  columns: null,
  columns_size: null,
  decimal_separator: null,
  header_lines: null,
  string_delimiter: null,
  thousands_separator: null,
});
const table = await io.CsvFormat.sample('files/1/log.csv', format, null, 1000);
console.log(table);

document.body.appendChild(
  <app-layout title="Logs">
    <gui-table
      value={table}
      headers={['Level', 'Time', 'Type', 'User', 'Task/Req', 'Tag', 'Context', 'Data']}
      columnsWidths={[100, 250, 100, 100, 120, 100, 200]}
      columnFactory={{
        1: GuiFactory.defineFromFn((v) => <gui-value value={core.time.create(v)} />),
      }}
      globalFilter
    />
  </app-layout>,
);
