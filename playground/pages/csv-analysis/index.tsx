import { GreyCat, IndexedDbCache, type GuiCsvStatistics, io, $, type GuiTable } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const progress = (<progress value={25} max={100} />) as HTMLProgressElement;

async function runAnalysis(filepath: string) {
  const task = await $.default.spawn('io::CsvAnalysis::analyze', [
    filepath,
    io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      enumerable_limit: 10_000,
    }),
  ]);

  sample.value = await io.CsvFormat.sample(filepath, io.CsvFormat.create(1));
  sample.fitColumnsToHeaders();

  return (await task.await()) as io.CsvStatistics;
}

const sample = (<gui-table style={{ height: '400px' }} />) as GuiTable;
const stats = await runAnalysis('./pages/csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics value={stats} />) as GuiCsvStatistics;

document.body.appendChild(
  <app-layout title="Csv Analysis">
    <div role="list">
      <fieldset>
        <legend>Analysis progress</legend>
        {progress}
      </fieldset>
      <fieldset>
        <legend>Dataset</legend>
        <select
          onchange={async (ev) => {
            const select = ev.target as HTMLSelectElement;
            csvStatistics.value = await runAnalysis(select.value);
          }}
        >
          <option value="./pages/csv-analysis/data/small.csv" selected>
            Small Dataset
          </option>
          <option value="./pages/csv-analysis/data/large.csv">Large Dataset</option>
          <option value="./pages/csv-analysis/data/people-100.csv">People 100</option>
          <option value="./pages/csv-analysis/data/people-10000.csv">People 10k</option>
        </select>
      </fieldset>
      <fieldset>
        <legend>Statistics</legend>
        {csvStatistics}
      </fieldset>
      <fieldset>
        <legend>Sample</legend>
        {sample}
      </fieldset>
    </div>
  </app-layout>,
);
