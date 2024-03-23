import { GreyCat, IndexedDbCache, GuiCsvStatistics, GuiTable, io, TaskHandler } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const progress = (<progress value={0} max={100} />) as HTMLProgressElement;

async function runAnalysis(filepath: string) {
  const task = await io.CsvAnalysis.analyze(
    filepath,
    io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      date_check_limit: null,
      date_formats: null,
      decimal_separator: null,
      enumerable_limit: 10_000,
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

  sample.value = await io.CsvFormat.sample(
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
  sample.fitColumnsToHeaders();
  return stats;
}

const sample = (<gui-table style={{ height: '400px' }} />) as GuiTable;
const stats = await runAnalysis('./csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics value={stats} />) as GuiCsvStatistics;

document.body.appendChild(
  <app-layout title="Csv Analysis">
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
            csvStatistics.value = await runAnalysis(select.value);
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
    </div>
  </app-layout>,
);
