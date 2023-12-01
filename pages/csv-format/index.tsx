import '../layout';
import { io } from '@greycat/sdk';

const app = document.createElement('app-layout');
app.title = 'CsvFormat';
await app.init();

document.body.prepend(app);

const csvFormatEl = document.createElement('gui-csv-format');
app.main.replaceChildren(csvFormatEl);

const stringCol = io.CsvColumnString.createFrom({
  name: "first_col", mandatory: false, offset: 0, trim: null, try_number: null, try_json: null, values: null, encoder: null
});

const csvFormat = io.CsvFormat.createFrom({
  header_lines: 1,
  infer: false,
  separator: null,
  string_delimiter: null,
  decimal_separator: null,
  thousands_separator: null,
  columns_size: null,
  columns: [stringCol],
});

csvFormatEl.format = csvFormat;
