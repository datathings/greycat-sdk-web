import {
  GreyCat,
  IndexedDbCache,
  type GuiCsvStatistics,
  io,
  $,
  type GuiTable,
  sl,
} from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

async function runAnalysis(filepath: string) {
  const task = await $.default.spawn('io::CsvAnalysis::analyze', [
    filepath,
    io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      enumerable_limit: 10_000,
    }),
  ]);

  sample.value = await io.CsvFormat.sample(filepath, io.CsvFormat.create(1));
  return (await task.await()) as io.CsvStatistics;
}

const sample = (<gui-table globalFilter style={{ height: '650px' }} />) as GuiTable;
const stats = await runAnalysis('./pages/csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics value={stats} />) as GuiCsvStatistics;

document.body.appendChild(
  <app-layout title="Csv Analysis">
    <sl-button variant="text" slot="action" onclick={() => sample.fitColumnsToHeaders()}>
      Fit columns to headers
    </sl-button>
    <div role="list">
      <sl-select
        label="Dataset"
        placeholder="Select a CSV file to analyze"
        onsl-change={async function (this: sl.SlSelect) {
          csvStatistics.value = await runAnalysis(this.value as string);
        }}
      >
        <sl-option value="./pages/csv-analysis/data/small.csv" selected>
          Small Dataset
        </sl-option>
        <sl-option value="./pages/csv-analysis/data/large.csv">Large Dataset</sl-option>
        <sl-option value="./pages/csv-analysis/data/people-100.csv">People 100</sl-option>
        <sl-option value="./pages/csv-analysis/data/people-10000.csv">People 10k</sl-option>
      </sl-select>
      <sl-details summary="Statistics">{csvStatistics}</sl-details>
      {sample}
    </div>
  </app-layout>,
);
