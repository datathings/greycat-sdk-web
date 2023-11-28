import { io } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Csv Analysis';
await app.init();

document.body.prepend(app);

const csvAnalysisEl = document.createElement('gui-csv-analysis');
app.main.appendChild(csvAnalysisEl);

const csvFormat = io.CsvFormat.createFrom({
  header_lines: 1,
  infer: false,
  separator: null,
  string_delimiter: null,
  decimal_separator: null,
  thousands_separator: null,
  columns_size: null,
  columns: null,
});

const csva = io.CsvAnalysis.createFrom({
  format: csvFormat,
  row_limit: null,
  enum_limit: 3,
  date_check_limit: null,
  date_formats: null,
  statistics: null,
});

const csvb = await io.CsvAnalysis.explore_new('./csv-analysis/data/data_smallest.csv', csva);
csvAnalysisEl.analysis = csvb;
