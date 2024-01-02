import { TaskHandler, io } from '@greycat/sdk';
import '../layout';
import { GuiCsvStatistics, GuiTable } from '../../src';

const app = document.createElement('app-layout');
app.title = 'Csv Analysis';
await app.init();

document.body.prepend(app);

const progress = (<progress value={0} max={100} />) as HTMLProgressElement;

async function runAnalysis(filepath: string) {
  const task = await io.CsvAnalysis.analyze(
    filepath,
    io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      date_check_limit: null,
      date_formats: null,
      decimal_separator: null,
      enum_limit: 10_000,
      row_limit: null,
      separator: null,
      string_delimiter: null,
      thousands_separator: null,
    }),
  );
  const handler = new TaskHandler(task);
  await handler.start(500, (info) => (progress.value = (info.progress ?? 0) * 100));
  const stats = await greycat.default.getFile<io.CsvStatistics>(
    `${task.user_id}/tasks/${task.task_id}/result.gcb`,
  );
  console.log('stats', stats);

  sample.table = await io.CsvFormat.sample(
    filepath,
    io.CsvFormat.createFrom({
      header_lines: 1,
      decimal_separator: null,
      separator: null,
      string_delimiter: null,
      thousands_separator: null,
      columns: null,
      columns_size: null,
    }),
    null,
    null,
  );
  return stats;
}

const sample = (<gui-table style={{ height: '400px' }} />) as GuiTable;
const stats = await runAnalysis('./csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics statistics={stats} />) as GuiCsvStatistics;

app.main.appendChild(
  <div>
    <fieldset>
      <label>
        <strong>Analysis progress</strong>
      </label>
      {progress}
    </fieldset>
    <fieldset>
      <label>
        <strong>Dataset</strong>
      </label>
      <select
        onchange={async (ev) => {
          const select = ev.target as HTMLSelectElement;
          csvStatistics.statistics = await runAnalysis(select.value);
        }}
      >
        <option value="./csv-analysis/data/small.csv" selected>
          Small Dataset
        </option>
        <option value="./csv-analysis/data/large.csv">Large Dataset</option>
        <option value="./csv-analysis/data/people-100.csv">People 100</option>
        <option value="./csv-analysis/data/people-10000.csv">People 10k</option>
      </select>
    </fieldset>
    <fieldset>
      <label>
        <strong>Statistics</strong>
      </label>
      {csvStatistics}
    </fieldset>
    <fieldset>
      <label>
        <strong>Sample</strong>
      </label>
      {sample}
    </fieldset>
  </div>,
);
